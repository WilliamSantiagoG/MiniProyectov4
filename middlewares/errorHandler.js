// Middleware de manejo de errores GLOBAL
// SIEMPRE debe ir al final de todo en index.js
export const errorHandler = (err, req, res, _next) => {
    console.error('ERROR GLOBAL:', err);

    // Error de JSON mal formado — cuando el body no es JSON válido
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({
            error: 'JSON inválido',
            mensaje: 'El body de la petición no es un JSON válido',
        });
    }

    // Error de Zod si alguien usa .parse() en vez de .safeParse()
    // .parse() lanza una excepción que llega aquí
    if (err.name === 'ZodError') {
        return res.status(400).json({
            error: 'Error de validación',
            detalles: err.issues.map((issue) => ({
                campo: issue.path.join('.') || 'body',
                mensaje: issue.message,
            })),
        });
    }

    // Error genérico del servidor — cualquier otro error inesperado
    return res.status(err.status || 500).json({
        error: err.message || 'Error interno del servidor',
    });
};
