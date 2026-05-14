import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Backend Error:', err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    error: `Not Found - ${req.originalUrl}`,
  });
};
