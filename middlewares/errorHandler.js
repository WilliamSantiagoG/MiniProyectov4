
import logger from '../logger/logger.js';

// Middleware de manejo de errores GLOBAL
// SIEMPRE debe ir al final de todo en app.js
export const errorHandler = (err, req, res, _next) => {

    // Registra el error con nivel ERROR usando Winston
    logger.error('ERROR GLOBAL', {
        mensaje: err.message,
        stack: err.stack, // donde ocurrio el error
    });

    // Error de JSON mal formado
    if (err.type === 'entity.parse.failed') {

        return res.status(400).json({
            error: 'JSON inválido',
            mensaje: 'El body de la petición no es un JSON válido',
        });

    }



    // Error de Zod
    if (err.name === 'ZodError') {

        return res.status(400).json({
            error: 'Error de validación',
            detalles: err.issues.map((issue) => ({
                campo: issue.path.join('.') || 'body',
                mensaje: issue.message,
            })),
        });

    }

    // Error genérico
    return res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor',
    });

};
