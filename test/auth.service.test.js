// Contiene la lógica de negocio y coordina la comunicación entre el Controller y el Repository.
// Importa las funciones de Jest
import { jest, describe, test, expect, beforeEach } from '@jest/globals';

// Crea un Mock del Repository antes de importar el Service
jest.unstable_mockModule('../repositories/auth.repository.js', () => ({
    // Cada vez que alguien importe este archivo,
    // no entrega el verdadero Repository.

    buscarUsuarioPorCorreoRepository: jest.fn(),

    crearUsuarioRepository: jest.fn(),
}));

// Mock de bcrypt
jest.unstable_mockModule('bcrypt', () => ({
    default: {
        hash: jest.fn(),
        compare: jest.fn(),
    },
}));

// Mock de jsonwebtoken
jest.unstable_mockModule('jsonwebtoken', () => ({
    default: {
        sign: jest.fn(),
    },
}));

// Importa el Repository simulado
const repository = await import('../repositories/auth.repository.js');

// Importa bcrypt simulado
const bcrypt = await import('bcrypt');

// Importa jwt simulado
const jwt = await import('jsonwebtoken');

// Importa el Service
const service = await import('../services/auth.service.js');

// Antes de cada prueba limpia los mocks
beforeEach(() => {
    jest.clearAllMocks();
});

describe('Pruebas del Auth Service', () => {

    test('Debe registrar un usuario', async () => {

        // El correo aún no existe
        repository.buscarUsuarioPorCorreoRepository.mockResolvedValue(null);

        // bcrypt genera el hash
        bcrypt.default.hash.mockResolvedValue('passwordHash');

        // El Repository devuelve el usuario creado
        // Cuando alguien intente crear un usuario devuelve este objeto
        // Simula la respuesta en la base de datos
        repository.crearUsuarioRepository.mockResolvedValue({
            id: 1,
            nombre: 'Administrador',
            correo: 'admin@gmail.com',
            password: 'passwordHash',
        });

        // Aqui se llama al service
        const resultado = await service.registrarUsuarioService({
            nombre: 'Administrador',
            correo: 'admin@gmail.com',
            password: '123456',
        });

        expect(resultado.id).toBe(1);
        expect(resultado.nombre).toBe('Administrador');
        expect(resultado.correo).toBe('admin@gmail.com');
    });

    test('No debe registrar un correo repetido', async () => {

        repository.buscarUsuarioPorCorreoRepository.mockResolvedValue({
            id: 1,
            correo: 'admin@gmail.com',
        });

        await expect(

            service.registrarUsuarioService({

                nombre: 'Administrador',

                correo: 'admin@gmail.com',

                password: '123456',

            })

        ).rejects.toThrow('El correo ya está registrado');

    });

    test('Debe iniciar sesión correctamente', async () => {

        repository.buscarUsuarioPorCorreoRepository.mockResolvedValue({

            id: 1,

            correo: 'admin@gmail.com',

            password: 'passwordHash',

        });

        bcrypt.default.compare.mockResolvedValue(true);

        jwt.default.sign.mockReturnValue('TOKEN_JWT');

        const token = await service.loginService({

            correo: 'admin@gmail.com',

            password: '123456',

        });

        expect(token).toBe('TOKEN_JWT');

    });

    test('No debe iniciar sesión con contraseña incorrecta', async () => {

        repository.buscarUsuarioPorCorreoRepository.mockResolvedValue({

            id: 1,

            correo: 'admin@gmail.com',

            password: 'passwordHash',

        });

        bcrypt.default.compare.mockResolvedValue(false);

        await expect(

            service.loginService({

                correo: 'admin@gmail.com',

                password: '123456',

            })

        ).rejects.toThrow('Credenciales inválidas');

    });

    test('No debe iniciar sesión con un correo inexistente', async () => {

        repository.buscarUsuarioPorCorreoRepository.mockResolvedValue(null);

        await expect(

            service.loginService({

                correo: 'otro@gmail.com',

                password: '123456',

            })

        ).rejects.toThrow('Credenciales inválidas');

    });

    test('Debe generar un JWT al iniciar sesión', async () => {

        repository.buscarUsuarioPorCorreoRepository.mockResolvedValue({

            id: 10,

            correo: 'admin@gmail.com',

            password: 'passwordHash',

        });

        bcrypt.default.compare.mockResolvedValue(true);

        jwt.default.sign.mockReturnValue('JWT_GENERADO');

        const token = await service.loginService({

            correo: 'admin@gmail.com',

            password: '123456',

        });

        expect(jwt.default.sign).toHaveBeenCalled();

        expect(token).toBe('JWT_GENERADO');

    });

});