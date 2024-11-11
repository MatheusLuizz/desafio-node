// middlewares/logMiddleware.js
const logger = require('../config/logger');

const logRequest = (req, res, next) => {
  logger.info(`Método: ${req.method} | URL: ${req.url} | Data: ${new Date().toISOString()}`);
  next(); // permite a continuação da requisição
};

module.exports = logRequest;
