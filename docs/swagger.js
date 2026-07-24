import swaggerJSDoc from 'swagger-jsdoc';

const options = {

    definition: {

        openapi: '3.0.0',

        info: {

            title: 'API CRUD de Tareas',

            version: '3.0.0',

            description: 'Mini proyecto Fase 5'

        },

        servers: [

            {
                url: 'http://localhost:3000'//servidor de la API
            }

        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        }

    },
    apis: ['./routes/*.js'] // Busca los comentarios @swagger dentro de router
};



// Lee los comentarios swagger y Construye automáticamente un enorme objeto llamado OpenAPI Specification CON TODA LA DOCUMENTACION
export const swaggerSpec = swaggerJSDoc(options); 