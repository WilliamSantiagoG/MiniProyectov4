// Realiza las operaciones de acceso a la base de datos utilizando Prisma.
import { prisma } from '../prisma/client.js';

// Crear una tarea
export const crearTareaRepository = (datos) => {
    return prisma.tarea.create({
        data: datos,
    });
};

// Obtener todas las tareas del usuario
export const obtenerTareasRepository = (
    userId,
) => {
    return prisma.tarea.findMany({
        where: {
            userId,
        },
    });
};

// Obtener una tarea del usuario por ID
export const obtenerTareaPorIdRepository = (
    id,
    userId,
) => {
    return prisma.tarea.findFirst({
        where: {
            id,
            userId,
        },
    });
};

// Actualizar tarea del usuario
export const actualizarTareaRepository = async (
    id,
    userId,
    datos,
) => {

    const tarea = await prisma.tarea.findFirst({
        where: {
            id,
            userId,
        },
    });

    if (!tarea) {
        return null;
    }

    return prisma.tarea.update({
        where: {
            id,
        },
        data: datos,
    });
};

// Eliminar tarea del usuario
export const eliminarTareaRepository = async (
    id,
    userId,
) => {

    const tarea = await prisma.tarea.findFirst({
        where: {
            id,
            userId,
        },
    });

    if (!tarea) {
        return null;
    }

    return prisma.tarea.delete({
        where: {
            id,
        },
    });
};