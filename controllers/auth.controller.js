// Recibe la petición HTTP, llama al Service y envía la respuesta al cliente
import {
    registrarUsuarioService,
    loginService,
} from '../services/auth.service.js';

export const registrar = async (req, res, next) => {

    try {

        const usuario = await registrarUsuarioService(req.body);

        res.status(201).json(usuario);

    } catch (err) {

        next(err);

    }

};

export const login = async (req, res, next) => {

    try {

        const token = await loginService(req.body);

        res.json({
            token,
        });

    } catch (err) {

        next(err);

    }

};