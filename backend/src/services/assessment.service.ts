import { prisma } from '../lib/prisma';
import { createAIService } from './ai/ai.factory';
import { NotFoundError, ForbiddenError, AppError } from '../utils/errors';
import fs from 'fs';

const aiService = createAIService();

// Helper to map DB assessment to frontend DTO
const mapAssessmentDTO = (assessment: any) => {
  if (!assessment) return null;
  const dto = { ...assessment };
  if (dto.questionnaire?.answers) {
    try { dto.questionnaire.answers = JSON.parse(dto.questionnaire.answers); } catch (e) {}
  }
  if (dto.result) {
    if (dto.result.possibleConditions) try { dto.result.possibleConditions = JSON.parse(dto.result.possibleConditions); } catch (e) {}
    if (dto.result.symptomsSummary) try { dto.result.symptomsSummary = JSON.parse(dto.result.symptomsSummary); } catch (e) {}
    if (dto.result.imageQuality) try { dto.result.imageQuality = JSON.parse(dto.result.imageQuality); } catch (e) {}
    if (dto.result.redFlags) try { dto.result.redFlags = JSON.parse(dto.result.redFlags); } catch (e) {}
  }
  return dto;
};

export class AssessmentService {
  async createAssessment(userId: string, familyMemberId?: string, questionnaireData?: any, bodyArea?: string) {
    const assessment = await prisma.skinAssessment.create({
      data: {
        userId,
        familyMemberId: familyMemberId || null,
        status: 'draft',
        bodyArea: bodyArea || undefined,
        questionnaire: questionnaireData ? {
          create: {
            answers: JSON.stringify(questionnaireData.answers || {}),
            freeTextDescription: questionnaireData.freeTextDescription,
            language: questionnaireData.language || 'en'
          }
        } : undefined
      }
    });
    return mapAssessmentDTO(assessment);
  }

  async uploadImage(assessmentId: string, file: Express.Multer.File) {
    const image = await prisma.skinImage.create({
      data: {
        assessmentId,
        filePath: file.path,
        originalName: file.originalname,
        mimeType: file.mimetype,
        fileSize: file.size
      }
    });
    return image;
  }

  async runAnalysis(assessmentId: string) {
    const assessment = await prisma.skinAssessment.findUnique({
      where: { id: assessmentId },
      include: { image: true, questionnaire: true }
    });
    if (!assessment) throw new NotFoundError('Assessment not found');

    await prisma.skinAssessment.update({ where: { id: assessmentId }, data: { status: 'analyzing' } });

    try {
      // Build symptom data from questionnaire
      let answers: any = {};
      try {
        if (assessment.questionnaire?.answers) {
          answers = JSON.parse(assessment.questionnaire.answers);
        }
      } catch (e) {}
      
      const symptomData = {
        mainProblems: answers.mainProblems || [],
        duration: answers.duration || 'unknown',
        progression: answers.progression || 'unknown',
        severity: answers.severity || 'moderate',
        hasPain: answers.hasPain || false,
        hasItching: answers.hasItching || false,
        hasSwelling: answers.hasSwelling || false,
        hasBleeding: answers.hasBleeding || false,
        hasDischarge: answers.hasDischarge || false,
        hasTreatment: answers.hasTreatment || false,
        treatmentDescription: answers.treatmentDescription,
        freeTextDescription: assessment.questionnaire?.freeTextDescription || undefined,
        bodyArea: assessment.bodyArea || undefined
      };

      // Read image if available
      let imageBuffer = Buffer.alloc(0);
      let imageMetadata = { filePath: '', mimeType: 'image/jpeg', fileSize: 0 };
      if (assessment.image) {
        try {
          imageBuffer = fs.readFileSync(assessment.image.filePath);
          imageMetadata = {
            filePath: assessment.image.filePath,
            mimeType: assessment.image.mimeType,
            fileSize: assessment.image.fileSize
          };
        } catch (e) {
          // If file not found, continue with empty buffer for mock
        }
      }

      // Get full AI assessment
      const result = await aiService.getFullAssessment(imageBuffer, imageMetadata, symptomData);

      // Clear any previous AI result or recommendations for this assessment to avoid unique constraint collisions
      await prisma.recommendation.deleteMany({ where: { assessmentId } });
      await prisma.aIResult.deleteMany({ where: { assessmentId } });

      // Save AI result
      const aiResult = await prisma.aIResult.create({
        data: {
          assessmentId,
          modelVersion: result.modelVersion,
          aiProvider: result.aiProvider,
          possibleConditions: JSON.stringify(result.possibleConditions),
          confidence: result.confidence,
          severity: result.severity,
          urgency: result.urgency,
          symptomsSummary: JSON.stringify(result.symptomsSummary),
          imageQuality: JSON.stringify(result.imageQuality),
          redFlags: JSON.stringify(result.redFlags),
          disclaimer: result.disclaimer
        }
      });

      // Save recommendations with proper Int priority mapping
      for (const rec of result.recommendations) {
        const priorityValue = typeof rec.priority === 'number'
          ? rec.priority
          : (rec.priority === 'urgent' ? 3 : rec.priority === 'high' ? 2 : rec.priority === 'medium' ? 1 : 0);

        await prisma.recommendation.create({
          data: {
            assessmentId,
            type: rec.type,
            title: rec.title,
            description: rec.description,
            priority: priorityValue
          }
        });
      }

      // Update assessment status
      await prisma.skinAssessment.update({ where: { id: assessmentId }, data: { status: 'completed' } });

      const finalAssessment = await prisma.skinAssessment.findUnique({
        where: { id: assessmentId },
        include: { image: true, questionnaire: true, result: true, recommendations: true }
      });
      return {
        assessment: mapAssessmentDTO(finalAssessment),
        result: mapAssessmentDTO({ result: aiResult }).result
      };
    } catch (error) {
      await prisma.skinAssessment.update({ where: { id: assessmentId }, data: { status: 'failed' } });
      throw error;
    }
  }

  async getAssessment(assessmentId: string, userId: string) {
    const assessment = await prisma.skinAssessment.findFirst({
      where: { id: assessmentId, userId },
      include: { image: true, questionnaire: true, result: true, recommendations: true, familyMember: true }
    });
    if (!assessment) throw new NotFoundError('Assessment not found');
    return mapAssessmentDTO(assessment);
  }

  async getUserAssessments(userId: string, filters?: { severity?: string; memberId?: string; startDate?: string; endDate?: string }) {
    const where: any = { userId };
    if (filters?.memberId) where.familyMemberId = filters.memberId;
    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};
      if (filters?.startDate) where.createdAt.gte = new Date(filters.startDate);
      if (filters?.endDate) where.createdAt.lte = new Date(filters.endDate);
    }

    const assessments = await prisma.skinAssessment.findMany({
      where,
      include: { result: true, image: true, familyMember: true },
      orderBy: { createdAt: 'desc' }
    });

    const mapped = assessments.map(mapAssessmentDTO);
    if (filters?.severity) {
      return mapped.filter(a => a.result?.severity === filters.severity);
    }
    return mapped;
  }
}

export const assessmentService = new AssessmentService();
