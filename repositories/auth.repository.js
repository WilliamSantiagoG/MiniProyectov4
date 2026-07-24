// Realiza las operaciones de acceso a la base de datos utilizando Prisma.
import { prisma } from '../prisma/client.js';

export const buscarUsuarioPorCorreoRepository = (correo) => {
    return prisma.user.findUnique({
        where: { correo },
    });
};

export const crearUsuarioRepository = (datos) => {
    return prisma.user.create({
        data: datos,
    });
};

export const buscarUsuarioPorIdRepository = (id) => {
    return prisma.user.findUnique({
        where: { id },
    });
};