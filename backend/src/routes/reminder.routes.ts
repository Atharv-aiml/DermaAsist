import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth.middleware';
import { reminderService } from '../services/reminder.service';

const router = Router();

router.post('/', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const data = await reminderService.createReminder(req.user.id, req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.get('/', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const data = await reminderService.getReminders(req.user.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

router.get('/today', requireAuth, async (req: AuthRequest, res, next) => {
  res.json({ success: true, data: [] });
});

router.put('/:id', requireAuth, async (req, res, next) => {
  res.json({ success: true, data: {} });
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  res.json({ success: true, message: 'Deleted' });
});

router.post('/:id/complete', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const data = await reminderService.toggleCompletion(req.user.id, req.params.id, req.body.date);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

export default router;
