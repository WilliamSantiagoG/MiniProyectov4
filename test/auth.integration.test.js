// Verifica el funcionamiento completo de la API realizando peticiones HTTP reales.
import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../app.js';

describe('Pruebas de integración - Autenticación', () => {

    test('Debe registrar un usuario', async () => {

        const correo = `usuario${Date.now()}@gmail.com`;

        // Realiza peticiones HTTP a la aplicación Express.
        const respuesta = await request(app)
            .post('/api/register')
            .send({
                nombre: 'Usuario Test',
                correo,
                password: '123456',
            });

        expect(respuesta.status).toBe(201); // 201 Created → El recurso se creó correctamente en el servidor.

        expect(respuesta.body).toHaveProperty('id');

        expect(respuesta.body.nombre).toBe('Usuario Test');

        expect(respuesta.body.correo).toBe(correo);

        // Nunca debe devolver el password
        expect(respuesta.body.password).toBeUndefined();

    });

    test('Debe iniciar sesión y devolver un JWT', async () => {

        // Se genera un correo único para este test
        const correo = `usuario${Date.now()}@gmail.com`;

        // Primero se registra el usuario
        await request(app)
            .post('/api/register')
            .send({
                nombre: 'Usuario Login',
                correo,
                password: '123456',
            });

        // Luego se hace login
        const respuesta = await request(app)
            .post('/api/login')
            .send({
                correo,
                password: '123456',
            });

        expect(respuesta.status).toBe(200);// 200 OK La solicitud se realizó correctamente y el servidor devuelve la información solicitada.

        // Debe devolver un token
        expect(respuesta.body).toHaveProperty('token');

        expect(typeof respuesta.body.token).toBe('string');

    });

    // Casos de error

    test('No debe registrar un correo repetido', async () => {

        const correo = `usuario${Date.now()}@gmail.com`;

        // Primer registro
        await request(app)
            .post('/api/register')
            .send({
                nombre: 'Usuario Test',
                correo,
                password: '123456',
            });

        // Segundo registro con el mismo correo
        const respuesta = await request(app)
            .post('/api/register')
            .send({
                nombre: 'Usuario Test',
                correo,
                password: '123456',
            });

        expect(respuesta.status).toBe(500);

    });

    test('No debe iniciar sesión con contraseña incorrecta', async () => {

        const correo = `usuario${Date.now()}@gmail.com`;

        await request(app)
            .post('/api/register')
            .send({
                nombre: 'Usuario Login',
                correo,
                password: '123456',
            });

        const respuesta = await request(app)
            .post('/api/login')
            .send({
                correo,
                password: '654321',
            });

        expect(respuesta.status).toBe(500);

    });

    test('No debe iniciar sesión con un correo inexistente', async () => {

        const respuesta = await request(app)
            .post('/api/login')
            .send({
                correo: 'noexiste@gmail.com',
                password: '123456',
            });

        expect(respuesta.status).toBe(500);

    });

    test('No debe registrar un usuario con datos inválidos', async () => {

        const respuesta = await request(app)
            .post('/api/register')
            .send({
                nombre: '',
                correo: 'correo-invalido',
                password: '121',
            });

        expect(respuesta.status).toBe(400);

    });

});