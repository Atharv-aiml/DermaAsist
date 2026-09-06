import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth.middleware';
import { familyService } from '../services/family.service';

const router = Router();

router.post('/', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const data = await familyService.createFamily(req.user.id, req.body.name);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.get('/', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const data = await familyService.getFamily(req.user.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.post('/members', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const data = await familyService.addMember(req.user.id, req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.put('/members/:id', requireAuth, async (req, res, next) => {
  res.json({ success: true, data: {} }); // Optional: implement update if needed
});

router.delete('/members/:id', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    await familyService.removeMember(req.user.id, req.params.id);
    res.json({ success: true, message: 'Member deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/members/:id/authorize', requireAuth, async (req, res, next) => {
  res.json({ success: true, data: {} });
});

export default router;
