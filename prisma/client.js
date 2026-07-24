// prisma/client.js
// se usa para poder comuniccar a prisma con SQLite
import 'dotenv/config'; // Carga las variables del archivo .env
import { PrismaClient } from '@prisma/client'; // Importa el cliente de Prisma
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'; // Importa el adaptador para SQLite

// Crea el adaptador usando la URL de la base de datos
const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? 'file:./dev.db',
});

// Crea y exporta una única instancia de Prisma para usarla en toda la aplicación
export const prisma = new PrismaClient({ adapter });
