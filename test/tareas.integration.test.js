// Verifica el funcionamiento completo de la API realizando peticiones HTTP reales.
// Importa las funciones de Jest
import { describe, test, expect, beforeAll } from '@jest/globals';

// Importa Supertest para hacer peticiones HTTP
import request from 'supertest';

// Importa la aplicación Express
import app from '../app.js';

let token;
let tareaId;

describe('Pruebas de integración - Tareas', () => {

    // Antes de ejecutar los tests registra un usuario y obtiene un JWT
    beforeAll(async () => {

        const correo = `usuario${Date.now()}@gmail.com`;

        // Registrar usuario
        // Realiza peticiones HTTP a la aplicación Express.
        await request(app)
            .post('/api/register')
            .send({
                nombre: 'Usuario Test',
                correo,
                password: '123456',
            });

        // Iniciar sesión
        const login = await request(app)
            .post('/api/login')
            .send({
                correo,
                password: '123456',
            });

        token = login.body.token;

    });

    test('Debe crear una tarea', async () => {

        const respuesta = await request(app)
            .post('/api/tareas')
            .set('Authorization', `Bearer ${token}`)
            .send({
                titulo: 'Aprender Supertest',
                descripcion: 'Pruebas de integración',
                completada: false,
                prioridad: 1,
            });

        expect(respuesta.status).toBe(201);

        expect(respuesta.body).toHaveProperty('id');

        expect(respuesta.body.titulo).toBe('Aprender Supertest');

        tareaId = respuesta.body.id;

    });

    test('Debe obtener todas las tareas del usuario', async () => {

        const respuesta = await request(app)
            .get('/api/tareas')
            .set('Authorization', `Bearer ${token}`);

        expect(respuesta.status).toBe(200);

        expect(Array.isArray(respuesta.body)).toBe(true);

    });

    test('Debe obtener una tarea por id', async () => {

        const respuesta = await request(app)
            .get(`/api/tareas/${tareaId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(respuesta.status).toBe(200);

        expect(respuesta.body.id).toBe(tareaId);

    });

    test('Debe actualizar una tarea', async () => {

        const respuesta = await request(app)
            .put(`/api/tareas/${tareaId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                titulo: 'Supertest Actualizado',
                descripcion: 'Nueva descripción',
                completada: true,
                prioridad: 2,
            });

        expect(respuesta.status).toBe(200);

        expect(respuesta.body.titulo).toBe('Supertest Actualizado');

    });

    test('Debe eliminar una tarea', async () => {

        const respuesta = await request(app)
            .delete(`/api/tareas/${tareaId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(respuesta.status).toBe(200);

        expect(respuesta.body.mensaje)
            .toBe('Tarea eliminada correctamente');

    });

    //Prueba de los casos de error 

    test('No debe crear una tarea sin token', async () => {

        const respuesta = await request(app)
            .post('/api/tareas')
            .send({
                titulo: 'Tarea sin token',
                prioridad: 1,
            });

        expect(respuesta.status).toBe(401);

        expect(respuesta.body.error)
            .toBe('Token requerido');

    });

    test('No debe permitir acceder con un token inválido', async () => {

        const respuesta = await request(app)
            .get('/api/tareas')
            .set('Authorization', 'Bearer token_invalido');

        expect(respuesta.status).toBe(401);

        expect(respuesta.body.error)
            .toBe('Token inválido');

    });

    test('No debe obtener una tarea inexistente', async () => {

        const respuesta = await request(app)
            .get('/api/tareas/999999')
            .set('Authorization', `Bearer ${token}`);

        expect(respuesta.status).toBe(404);

        expect(respuesta.body.error)
            .toBe('Tarea no encontrada');

    });

    test('No debe actualizar una tarea inexistente', async () => {

        const respuesta = await request(app)
            .put('/api/tareas/99999')
            .set('Authorization', `Bearer ${token}`)
            .send({
                titulo: 'Nueva',
            });

        expect(respuesta.status).toBe(404);

        expect(respuesta.body.error)
            .toBe('Tarea no encontrada');

    });

}); 