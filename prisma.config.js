import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
    schema: 'prisma/schema.prisma', //Donde está es esquema
    migrations: {
        path: 'prisma/migrations', //Donde guardar las migraciones
        seed: 'node prisma/seed.js', // Comando que Prisma ejecutará al hacer db seed
    },
    datasource: {
        url: env('DATABASE_URL'), //Donde esta la Base de datos
    },
});
