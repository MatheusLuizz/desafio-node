const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Nível do log (info, debug, warn, error)
  transports: [
    new winston.transports.Console(), //console
    new winston.transports.File({ filename: 'logs/activity.log' }) // em arquivo
  ]
});

module.exports = logger;
