import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { profileUpdateSchema } from '../utils/validators';

const router = Router();

router.get('/', requireAuth, (req: AuthRequest, res) => {
  res.json({ success: true, data: req.user });
});

router.put('/', requireAuth, validate(profileUpdateSchema), (req: AuthRequest, res) => {
  // Update logic here
  res.json({ success: true, data: req.body });
});

router.put('/password', requireAuth, (req: AuthRequest, res) => {
  res.json({ success: true, message: 'Password updated' });
});

export default router;
