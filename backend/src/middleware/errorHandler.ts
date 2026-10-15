import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Ha ocurrido un error:', err);
  if (err.name === 'ZodError') {
    return res.status(400).json({ error: "La IA ha devuelto un formato invalido" });
  }
  res.status(500).json({ error: err.message || "error interno..." });
};