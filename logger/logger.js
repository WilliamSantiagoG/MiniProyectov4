import winston from 'winston';

const logger = winston.createLogger({

    level: 'info',

    format: winston.format.combine(

        winston.format.timestamp(),

        winston.format.json(),

    ),

    transports: [

        // Muestra todos los logs en la consola
        new winston.transports.Console(),

        // Guarda todos los logs (info, warn y error)
        new winston.transports.File({
            filename: 'logs/app.log',
        }),

        // Guarda únicamente los errores
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),

    ],

});

export default logger;