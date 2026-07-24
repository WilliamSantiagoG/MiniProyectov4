// Define las reglas de validación de los datos de entrada utilizando Zod
import { z } from 'zod';
//Reglas de validación
export const schemaTareaCrear = z.object({
    titulo: z
        .string({
            //issue es un objeto del error
            error: (issue) => {
                if (issue.input === undefined) {
                    return 'El título es obligatorio';
                }

                return 'El título debe ser texto';
            },
        })
        .min(1, 'El título no puede estar vacío')
        .max(100, 'El título no puede tener más de 100 caracteres'),

    descripcion: z
        .string({
            error: () => 'La descripción debe ser texto',
        })
        .max(500, 'La descripción no puede tener más de 500 caracteres')
        .optional(),

    completada: z
        .boolean({
            error: () => 'Completada debe ser true o false',
        })
        .optional(),
    prioridad: z
        .number({
            error: () => 'La prioridad debe ser un número',
        })
        .int('La prioridad debe ser un número entero')
        .min(1, 'La prioridad mínima es 1')
        .max(3, 'La prioridad máxima es 3')
        .optional(),
});

// Esquema para PUT (editar) todos los campos opcionales
// pero al menos uno debe llegar
export const schemaTareaEditar = z
    .object({
        titulo: z
            .string({
                error: () => 'El título debe ser texto',
            })
            .min(1, 'El título no puede estar vacío')
            .max(100, 'El título no puede tener más de 100 caracteres')
            .optional(),

        descripcion: z
            .string({
                error: () => 'La descripción debe ser texto',
            })
            .max(500, 'La descripción no puede tener más de 500 caracteres')
            .optional(),

        completada: z
            .boolean({
                error: () => 'Completada debe ser true o false',
            })
            .optional(),
        prioridad: z
            .number({
                error: () => 'La prioridad debe ser un número',
            })
            .int('La prioridad debe ser un número entero')
            .min(1, 'La prioridad mínima es 1')
            .max(3, 'La prioridad máxima es 3')
            .optional(),
    })
    .refine(
        (data) =>
            data.titulo !== undefined ||
            data.descripcion !== undefined ||
            data.completada !== undefined ||
            data.prioridad !== undefined,
        {
            message: 'Debes enviar al menos un campo para actualizar',
        },
    );
