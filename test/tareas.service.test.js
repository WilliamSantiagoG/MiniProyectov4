// Contiene la lógica de negocio y coordina la comunicación entre el Controller y el Repository.
// Importa las funciones de Jest
import { jest, describe, test, expect, beforeEach } from '@jest/globals';

// Crea un Mock del Repository antes de importar el Service
jest.unstable_mockModule('../repositories/tareas.repository.js', () => ({ // Cada vez que alguien importe este archivo, no entrega el verdadero.
    crearTareaRepository: jest.fn(),// crea una funcion falsa
    obtenerTareasRepository: jest.fn(),
    obtenerTareaPorIdRepository: jest.fn(),
    actualizarTareaRepository: jest.fn(),
    eliminarTareaRepository: jest.fn(),
}));

// Importa el Repository simulado. devuelve una promise
const repository = await import('../repositories/tareas.repository.js'); //no esta importando el respositorio verdadero Está importando el Mock.

// Importa el Service devuelve una promise
const service = await import('../services/tareas.service.js'); //se importa despues antes despues de creado el mock

// Antes de cada prueba limpia los mocks
beforeEach(() => {
    jest.clearAllMocks();
});

describe('Pruebas del Tareas Service', () => { // Agrupa todas las pruebas del crud

    test('Debe crear una tarea', async () => {

        //Simula la respuesta en la base de datos
        repository.crearTareaRepository.mockResolvedValue({ // Cuando alguien importe este Repository, NO usa el verdadero. mock devuelve una promise
            id: 1,
            titulo: 'Aprender Prisma',
            descripcion: '',
            completada: false,
            prioridad: 1
        });

        const resultado = await service.crearTareaService(
            {
                titulo: 'Aprender Prisma',
                prioridad: 1,
            },
            1 // userId
        );

        expect(resultado.id).toBe(1);
        expect(resultado.titulo).toBe('Aprender Prisma');
    });

    test('Debe obtener todas las tareas', async () => {

        repository.obtenerTareasRepository.mockResolvedValue([
            {
                id: 1,
                titulo: 'Express'
            },
            {
                id: 2,
                titulo: 'Prisma'
            }
        ]);

        const resultado = await service.obtenerTareasService(1);

        expect(resultado).toHaveLength(2);
    });

    test('Debe obtener una tarea por id', async () => {

        repository.obtenerTareaPorIdRepository.mockResolvedValue({
            id: 3,
            titulo: 'Zod'
        });

        const resultado = await service.obtenerTareasServiceid(3, 1);

        expect(resultado.id).toBe(3);
        expect(resultado.titulo).toBe('Zod');
    });

    test('Debe actualizar una tarea', async () => {

        repository.obtenerTareaPorIdRepository.mockResolvedValue({
            id: 1,
            titulo: 'Viejo'
        });

        repository.actualizarTareaRepository.mockResolvedValue({
            id: 1,
            titulo: 'Nuevo'
        });

        const resultado = await service.actualizarTareaService(100, {
            titulo: 'Nuevo'
        }, 1);

        expect(resultado.titulo).toBe('Nuevo');
    });

    test('No debe actualizar una tarea inexistente', async () => {

        repository.obtenerTareaPorIdRepository.mockResolvedValue(null);

        const resultado = await service.actualizarTareaService(100, {
            titulo: 'Nuevo'
        });

        expect(resultado).toBeNull();
    });

    test('Debe eliminar una tarea', async () => {

        repository.obtenerTareaPorIdRepository.mockResolvedValue({
            id: 1
        });

        repository.eliminarTareaRepository.mockResolvedValue();

        const resultado = await service.eliminarTareaService(1, 1);

        expect(resultado).toBe(true);
    });

    test('No debe eliminar una tarea inexistente', async () => {

        repository.obtenerTareaPorIdRepository.mockResolvedValue(null);

        const resultado = await service.eliminarTareaService(100, 1);

        expect(resultado).toBe(false);
    });

});