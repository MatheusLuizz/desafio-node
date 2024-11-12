const { createClient } = require('redis');

const redis = createClient({
  socket: {
    host: '127.0.0.1', // Redis no Docker
    port: 6379,
  },
  database: 0,
});

redis.on('connect', () => {
  console.log('Conectado ao Redis');
});

redis.on('error', (err) => {
  console.error('Erro no Redis:', err);
});

redis.on('ready', () => {
  console.log('Redis pronto para uso');
});

// Conectar ao Redis
redis.connect().catch((err) => {
  console.error('Erro ao conectar ao Redis:', err);
});

module.exports = redis;
