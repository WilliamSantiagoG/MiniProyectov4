// Recibe la petición HTTP
// Recibir petición, Llamar al Service, Enviar respuesta

import {
    crearTareaService,
    obtenerTareasService,
    actualizarTareaService,
    eliminarTareaService,
    obtenerTareasServiceid,
} from '../services/tareas.service.js';

export const crearTarea = async (req, res, next) => {
    try {
        const tarea = await crearTareaService(
            req.body,
            req.usuario.id,
        );

        res.status(201).json(tarea);
    } catch (err) {
        next(err);
    }
};

export const obtenerTareas = async (req, res, next) => {
    try {
        const tareas = await obtenerTareasService(
            req.usuario.id,
        );

        res.json(tareas);
    } catch (err) {
        next(err);
    }
};

export const obtenerTareasid = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        const tarea = await obtenerTareasServiceid(
            id,
            req.usuario.id,
        );

        if (!tarea) {
            return res.status(404).json({
                error: 'Tarea no encontrada',
            });
        }

        res.json(tarea);
    } catch (err) {
        next(err);
    }
};

export const actualizarTarea = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        const tarea = await actualizarTareaService(
            id,
            req.body,
            req.usuario.id,
        );

        if (!tarea) {
            return res.status(404).json({
                error: 'Tarea no encontrada',
            });
        }

        res.json(tarea);
    } catch (err) {
        next(err);
    }
};

export const eliminarTarea = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        const eliminada = await eliminarTareaService(
            id,
            req.usuario.id,
        );

        if (!eliminada) {
            return res.status(404).json({
                error: 'Tarea no encontrada',
            });
        }

        res.json({
            mensaje: 'Tarea eliminada correctamente',
        });
    } catch (err) {
        next(err);
    }
};