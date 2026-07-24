import bcrypt from 'bcrypt';
import { prisma } from './client.js';

async function main() {

    const passwordHash = await bcrypt.hash('123456', 10);

    const usuario = await prisma.user.create({

        data: {

            nombre: 'Administrador',

            correo: 'admin@gmail.com',

            password: passwordHash,

        },

    });

    await prisma.tarea.createMany({

        data: [

            {

                titulo: 'Aprender Express',

                descripcion: 'Estudiar rutas y middlewares',

                completada: false,

                prioridad: 1,

                userId: usuario.id,

            },

            {

                titulo: 'Aprender Prisma',

                descripcion: 'Aprender migraciones',

                completada: true,

                prioridad: 2,

                userId: usuario.id,

            },

            {

                titulo: 'Aprender Zod',

                descripcion: 'Validar datos',

                completada: false,

                prioridad: 3,

                userId: usuario.id,

            },

        ],

    });

    console.log('Seeder ejecutado correctamente');

}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });