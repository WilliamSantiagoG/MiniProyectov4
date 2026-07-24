// Middleware que recibe cualquier esquema Zod
// y valida el body de la petición contra ese esquema
export const validar = (schema) => (req, res, next) => {

    // nunca lanza exepcion, siempre da un objeto
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
        const errores = resultado.error.issues.map((err) => ({
            campo: err.path.join('.') || 'body',
            mensaje: err.message,
        }));

        return res.status(400).json({
            error: 'Datos inválidos',
            detalles: errores,
        });
    }
    // Si todo está bien, reemplaza req.body con los datos
    // ya validados y limpios por Zod
    req.body = resultado.data;
    next();
};

/*// Si los datos son válidos:
resultado = {
    success: true,
    data: { titulo: "Mi tarea", descripcion: "..." }
    //       datos limpios y validados por Zod
}


// Si los datos son inválidos:
resultado = {
    success: false,
    error: {
        issues: [
            { path: ["titulo"], message: "El título es obligatorio", ... },
            { path: ["completada"], message: "Completada debe ser true o false", ... }
        ]
    }
}*/
