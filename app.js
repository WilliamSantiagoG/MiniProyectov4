import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './routes/tareas.routes.js';
import authRouter from './routes/auth.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import swaggerUi from 'swagger-ui-express'; // Mostrar la documentación de Swagger en una página web.
import { swaggerSpec } from './docs/swagger.js'; //swaggerSpec contiene toda la documentación de la API.
import { limiter } from './middlewares/rateLimiter.js'; //limitación de peticiones

// Inicializar la aplicación Express
const app = express();

// Permite peticiones desde otros orígenes
app.use(
    cors({
        origin: 'http://127.0.0.1:5500',
    }),
);

// Agrega cabeceras HTTP de seguridad
app.use(helmet());

//convierte el JSON del body a objeto para poder leer req.body
app.use(express.json());

// limitador de peticiones (rateLimit)
// Pregunta las peticiones que lleva la IP
app.use(limiter);

app.use('/api', authRouter);

app.use('/api', router);

app.use(errorHandler);

app.use(
    '/api-docs', // ruta para ejecutar swagger http://localhost:3000/api-docs
    swaggerUi.serve, // envia todo lo que necesita la interfaz de swagger HTML CSS..
    swaggerUi.setup(swaggerSpec) // Construye una pagina usando toda la documentacion
);

// Exporta la aplicación para poder usarla en index
export default app;