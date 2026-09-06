import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/token';
import { prisma } from '../lib/prisma';

export interface AuthRequest extends Request {
  user?: any;
}

export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ') && authHeader !== 'Bearer demo-bypass-token') {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = verifyAccessToken(token);
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (user) {
          req.user = user;
          return next();
        }
      } catch {
        // Fall back to demo user if token is invalid during local development
      }
    }

    // Demo/Development fallback: Use first seeded user
    const user = await prisma.user.findFirst();
    if (!user) {
      return res.status(401).json({ error: 'User not found in DB (please seed)' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

export const requireAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
    
    next();
  } catch (error) {
    res.status(403).json({ error: 'Forbidden' });
  }
};
