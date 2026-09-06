import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth.middleware';
import { notificationService } from '../services/notification.service';

const router = Router();

router.get('/', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const data = await notificationService.getNotifications(req.user.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.put('/:id/read', requireAuth, async (req, res, next) => {
  res.json({ success: true, data: {} });
});

router.put('/read-all', requireAuth, async (req, res, next) => {
  res.json({ success: true, message: 'All read' });
});

export default router;
