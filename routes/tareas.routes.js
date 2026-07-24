// Define las rutas de la API y asocia cada endpoint con su controlador y middlewares
import express from 'express';

import { validar } from '../middlewares/validar.js';
import { loggerMiddleware } from '../middlewares/logger.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

import {
    crearTarea,
    obtenerTareas,
    actualizarTarea,
    eliminarTarea,
    obtenerTareasid,
} from '../controllers/tareas.controller.js';

import {
    schemaTareaCrear,
    schemaTareaEditar,
} from '../schemas/tareas.schema.js';

const router = express.Router();

router.use(loggerMiddleware);

/**
 * @swagger
 * /api/tareas:
 *   post:
 *     summary: Crear una nueva tarea
 *     description: Crea una nueva tarea y la asocia automáticamente al usuario autenticado mediante el JWT.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Aprender Express
 *               descripcion:
 *                 type: string
 *                 example: Estudiar rutas y middlewares
 *               completada:
 *                 type: boolean
 *                 example: false
 *               prioridad:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - titulo
 *     responses:
 *       201:
 *         description: Tarea creada correctamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token inválido o no enviado.
 */
router.post(
    '/tareas',
    verificarToken,
    validar(schemaTareaCrear),
    crearTarea,
);

/**
 * @swagger
 * /api/tareas:
 *   get:
 *     summary: Obtener todas mis tareas
 *     description: Devuelve únicamente las tareas pertenecientes al usuario autenticado.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida correctamente.
 *       401:
 *         description: Token inválido o no enviado.
 */
router.get(
    '/tareas',
    verificarToken,
    obtenerTareas,
);

/**
 * @swagger
 * /api/tareas/{id}:
 *   get:
 *     summary: Obtener una de mis tareas por ID
 *     description: Devuelve una tarea únicamente si pertenece al usuario autenticado.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Tarea encontrada.
 *       401:
 *         description: Token inválido o no enviado.
 *       404:
 *         description: La tarea no existe o no pertenece al usuario autenticado.
 */
router.get(
    '/tareas/:id',
    verificarToken,
    obtenerTareasid,
);

/**
 * @swagger
 * /api/tareas/{id}:
 *   put:
 *     summary: Actualizar una tarea propia
 *     description: Actualiza una tarea únicamente si pertenece al usuario autenticado.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: integer
 *           example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Aprender Prisma
 *               descripcion:
 *                 type: string
 *                 example: Aprender migraciones de Prisma
 *               completada:
 *                 type: boolean
 *                 example: true
 *               prioridad:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Token inválido o no enviado.
 *       404:
 *         description: La tarea no existe o no pertenece al usuario autenticado.
 */
router.put(
    '/tareas/:id',
    verificarToken,
    validar(schemaTareaEditar),
    actualizarTarea,
);

/**
 * @swagger
 * /api/tareas/{id}:
 *   delete:
 *     summary: Eliminar una tarea propia
 *     description: Elimina una tarea únicamente si pertenece al usuario autenticado.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente.
 *       401:
 *         description: Token inválido o no enviado.
 *       404:
 *         description: La tarea no existe o no pertenece al usuario autenticado.
 */
router.delete(
    '/tareas/:id',
    verificarToken,
    eliminarTarea,
);

export default router;