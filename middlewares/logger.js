// middlewares/logger.js

import logger from '../logger/logger.js';

export const loggerMiddleware = (req, res, next) => {

      const timestamp = new Date().toLocaleString();
      const method = req.method;
      const url = req.originalUrl;

      // Registra la llegada de la petición
      logger.info(`[${timestamp}] ${method} ${url}`);

      // Se ejecuta cuando la respuesta ya fue enviada
      res.on('finish', () => {

            logger.info(
                  `[${timestamp}] ${method} ${url} - Estado: ${res.statusCode}`,
            );


      });

      next();

};