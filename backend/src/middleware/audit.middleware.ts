import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from './auth.middleware';

export const auditLog = (action: string, resource: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    // We only log after the request is finished
    res.on('finish', async () => {
      try {
        if (req.user) {
          await prisma.auditLog.create({
            data: {
              userId: req.user.id,
              action,
              resource,
              details: `Status: ${res.statusCode} | Method: ${req.method} | URL: ${req.originalUrl}`,
              ipAddress: req.ip || req.connection.remoteAddress
            }
          });
        }
      } catch (err) {
        console.error('Failed to create audit log', err);
      }
    });
    next();
  };
};
