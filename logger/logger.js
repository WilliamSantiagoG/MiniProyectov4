import winston from 'winston';

const logger = winston.createLogger({

    level: 'info', // Winston solo registrará los mensajes cuyo nivel sea igual o de mayor prioridad que info

    format: winston.format.combine(

        winston.format.timestamp(),// Agrega automaticamente en formato fecha hora

        winston.format.json(), //hace que el log se guarde en formato JSON

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

/*
Niveles de Winston:

error   -> 0
warn    -> 1
info    -> 2
http    -> 3
verbose -> 4
debug   -> 5
silly   -> 6
*/