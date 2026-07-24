// Define las reglas de validación de los datos de entrada utilizando Zod
import { z } from 'zod';

export const schemaRegistro = z.object({

    nombre: z.string().min(3),

    correo: z.email(),

    password: z.string().min(6),

});

export const schemaLogin = z.object({

    correo: z.email(),

    password: z.string(),

});