import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => (
    console.error('error:, err');



    if (err.name === 'ZodError') {
        return res.status(400).json({
            error: "VALIDATION_ERROR",
            message: "Respuesta de la IA no tiene un formato el cual se esperaba"
        });
    }


    if (err.status === 401 || err.message?.includes('API key')) {
        return res.status(401).json({
            error: "UNAUTHORIZED",
            message: "Error al intentar autenticar el servidor de IA"
        });
    }

    res.status(err.status || 500).json({
        error: err.code || "INTERNAL_SERVER_ERROR",
        message: err.message || "ha ocurrido un error"
    });
);