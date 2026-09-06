import { Router, Response } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth.middleware';
import { authService } from '../services/auth.service';
import { validate } from '../middleware/validate.middleware';
import { loginSchema, registerSchema } from '../utils/validators';
import { authRateLimit } from '../middleware/rateLimit.middleware';

const router = Router();

router.post('/register', authRateLimit, validate(registerSchema), async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

router.post('/login', authRateLimit, validate(loginSchema), async (req, res, next) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', requireAuth, (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

router.post('/refresh', (req, res) => {
  // Mock refresh
  res.json({ success: true, data: { accessToken: 'new-token' } });
});

router.post('/forgot-password', authRateLimit, (req, res) => {
  res.json({ success: true, message: 'Reset email sent' });
});

router.post('/reset-password', (req, res) => {
  res.json({ success: true, message: 'Password reset' });
});

router.get('/me', requireAuth, (req: AuthRequest, res) => {
  res.json({ success: true, data: req.user });
});

export default router;
