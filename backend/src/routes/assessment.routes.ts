import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth.middleware';
import { assessmentService } from '../services/assessment.service';
import { validate } from '../middleware/validate.middleware';
import { assessmentCreateSchema, questionnaireSchema } from '../utils/validators';
import { upload } from '../middleware/upload.middleware';
import { prisma } from '../lib/prisma';
import path from 'path';

const router = Router();

router.post('/', requireAuth, validate(assessmentCreateSchema), async (req: AuthRequest, res, next) => {
  try {
    const data = await assessmentService.createAssessment(req.user.id, req.body.familyMemberId, req.body.questionnaire, req.body.bodyArea);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/image', requireAuth, upload.single('image'), async (req: AuthRequest, res, next) => {
  try {
    if (!req.file) throw new Error('No file uploaded');
    
    // Auth check
    const assessment = await prisma.skinAssessment.findFirst({ where: { id: req.params.id, userId: req.user.id } });
    if (!assessment) return res.status(403).json({ success: false, error: 'Forbidden' });
    
    const image = await assessmentService.uploadImage(req.params.id, req.file);
    res.json({ success: true, data: image });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/questionnaire', requireAuth, validate(questionnaireSchema), async (req: AuthRequest, res, next) => {
  try {
    // Auth check
    const assessment = await prisma.skinAssessment.findFirst({ where: { id: req.params.id, userId: req.user.id } });
    if (!assessment) return res.status(403).json({ success: false, error: 'Forbidden' });

    const q = await prisma.questionnaireAnswer.create({
      data: {
        assessmentId: req.params.id,
        answers: JSON.stringify(req.body.answers || {}),
        freeTextDescription: req.body.freeTextDescription,
        language: req.body.language || 'en'
      }
    });
    res.json({ success: true, data: q });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/analyze', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    // Auth check
    const assessment = await prisma.skinAssessment.findFirst({ where: { id: req.params.id, userId: req.user.id } });
    if (!assessment) return res.status(403).json({ success: false, error: 'Forbidden' });

    const data = await assessmentService.runAnalysis(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.get('/', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const data = await assessmentService.getUserAssessments(req.user.id, {
      memberId: req.query.memberId as string,
      severity: req.query.severity as string
    });
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const data = await assessmentService.getAssessment(req.params.id, req.user.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.get('/:id/image', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const image = await prisma.skinImage.findUnique({
      where: { assessmentId: req.params.id }
    });
    const assessment = await prisma.skinAssessment.findUnique({
      where: { id: req.params.id }
    });
    
    if (!image || !assessment) return res.status(404).json({ success: false, error: 'Not found' });
    if (assessment.userId !== req.user.id) return res.status(403).json({ success: false, error: 'Forbidden' });
    
    res.sendFile(path.resolve(image.filePath));
  } catch (error) {
    next(error);
  }
});

export default router;
