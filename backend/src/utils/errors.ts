import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ValidationError extends AppError {
  constructor(message: string) { super(message, 400); }
}

export class AuthError extends AppError {
  constructor(message: string = 'Unauthorized') { super(message, 401); }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') { super(message, 403); }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Not Found') { super(message, 404); }
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  res.status(500).json({ error: 'Internal Server Error' });
};
