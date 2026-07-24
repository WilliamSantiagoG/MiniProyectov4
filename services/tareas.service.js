// Contiene la lógica de negocio y coordina la comunicación entre el Controller y el Repository.
import {
    crearTareaRepository,
    obtenerTareasRepository,
    obtenerTareaPorIdRepository,
    actualizarTareaRepository,
    eliminarTareaRepository,
} from '../repositories/tareas.repository.js';

export const crearTareaService = async (
    {
        titulo,
        descripcion,
        completada,
        prioridad,
    },
    userId,
) => {
    return await crearTareaRepository({
        titulo,
        descripcion: descripcion ?? '',
        completada,
        prioridad,
        userId,
    });
};

export const obtenerTareasService = async (userId) => {
    return await obtenerTareasRepository(userId);
};

export const obtenerTareasServiceid = async (
    id,
    userId,
) => {
    return await obtenerTareaPorIdRepository(
        id,
        userId,
    );
};

export const actualizarTareaService = async (
    id,
    datos,
    userId,
) => {

    const tareaActual =
        await obtenerTareaPorIdRepository(
            id,
            userId,
        );

    if (!tareaActual) return null;

    const {
        titulo,
        descripcion,
        completada,
        prioridad,
    } = datos;

    const datosParaActualizar = {
        ...(titulo !== undefined && { titulo }),
        ...(descripcion !== undefined && { descripcion }),
        ...(completada !== undefined && { completada }),
        ...(prioridad !== undefined && { prioridad }),
    };

    const tieneCambios = Object.keys(
        datosParaActualizar,
    ).some((key) => {
        return (
            tareaActual[key] !==
            datosParaActualizar[key]
        );
    });

    if (!tieneCambios) {
        return tareaActual;
    }

    return await actualizarTareaRepository(
        id,
        userId,
        datosParaActualizar,
    );
};

export const eliminarTareaService = async (
    id,
    userId,
) => {

    const existe =
        await obtenerTareaPorIdRepository(
            id,
            userId,
        );

    if (!existe) return false;

    await eliminarTareaRepository(
        id,
        userId,
    );

    return true;
};