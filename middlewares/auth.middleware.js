// Verifica el JWT y autentica al usuario antes de permitir el acceso a las rutas protegidas
import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            error: 'Token requerido',
        });

    }

    const token = authHeader.split(' ')[1]; // Crea un array (espacios), extrae solo el token 

    try {

        //Verifica la información que se guardo en el token
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = payload;

        next();

    } catch {

        return res.status(401).json({
            error: 'Token inválido',
        });

    }

};