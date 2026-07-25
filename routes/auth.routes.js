// Define las rutas de la API y asocia cada endpoint con su controlador y middlewares.
import express from 'express';

import { validar } from '../middlewares/validar.js';
import { loggerMiddleware } from '../middlewares/logger.js';

import {
    registrar,
    login,
} from '../controllers/auth.controller.js';

import {
    schemaRegistro,
    schemaLogin,
} from '../schemas/auth.schema.js';

const router = express.Router();

router.use(loggerMiddleware);


/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Crea un nuevo usuario en la base de datos.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Administrador
 *               correo:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *             required:
 *               - nombre
 *               - correo
 *               - password
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente.
 *       400:
 *         description: Datos inválidos.
 */

router.post(
    '/register',
    validar(schemaRegistro),
    registrar,
);


/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica un usuario y devuelve un JWT.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *             required:
 *               - correo
 *               - password
 *     responses:
 *       200:
 *         description: Login exitoso.
 *       401:
 *         description: Credenciales inválidas.
 */

router.post(
    '/login',
    validar(schemaLogin),
    login,
);

export default router;