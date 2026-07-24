// middlewares/logger.js
export const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toLocaleString();
    const method = req.method;
    const url = req.originalUrl;

    console.log(`[${timestamp}] ${method} ${url}`);

    // Se ejecuta cuando la respuesta ya fue enviada, para saber el estado codigo
    //res es un objeto que hereda de un objeto llamado EventEmitter de Node.js.
    res.on('finish', () => {
        console.log(
            `[${timestamp}] ${method} ${url} - Estado: ${res.statusCode}`,
        );
    });

    // continuar
    next();
};

/* 
Como funciona el res.on
Cliente
      │
      ▼
Logger
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
res.status(201).json(...)
      │
      ▼
Se envía la respuesta
      │
      ▼
Evento finish
      │
      ▼
console.log(...)*/
