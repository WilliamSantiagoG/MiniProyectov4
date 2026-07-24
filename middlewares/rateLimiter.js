import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({

    windowMs: 15 * 60 * 1000, // Es el tiempo durante el cual se cuentan las peticiones 900000 milisegundos
    max: 100, //maximo 100 peticiones durante 15 minutos

    message: {
        error: "Demasiadas peticiones."
    }

});