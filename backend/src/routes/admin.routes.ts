import { Router } from 'express';
import { requireAuth, requireAdmin, AuthRequest } from '../middleware/auth.middleware';
import { adminService } from '../services/admin.service';

const router = Router();

router.get('/stats', requireAuth, requireAdmin, async (req: AuthRequest, res, next) => {
  try {
    const data = await adminService.getDashboardStats();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.get('/model', requireAuth, requireAdmin, async (req, res, next) => {
  res.json({ success: true, data: { name: 'DermaAsist Mock Model', version: 'mock-v1.0' } });
});

router.get('/errors', requireAuth, requireAdmin, async (req, res, next) => {
  res.json({ success: true, data: [] });
});

router.get('/health', requireAuth, requireAdmin, async (req, res, next) => {
  res.json({ success: true, data: { status: 'healthy' } });
});

export default router;
