const redis = require('../config/redis');

const cache = async (req, res, next) => {
  const { key } = req.params;

  console.log('Verificando cache para a chave:', key);

  try {
    // Tenta obter o dado do cache Redis
    const data = await redis.get(key);

    if (data) {
      console.log('Dados encontrados no cache Redis');
      return res.json(JSON.parse(data)); // Retorna os dados como JSON
    }

    console.log('Dados não encontrados no cache, passando para a próxima etapa');
    // Caso os dados não existam, continue com a requisição
    next();
  } catch (err) {
    console.error('Erro ao acessar o cache Redis:', err);
    return next(); // Em caso de erro, continua com a requisição
  }
};

module.exports = cache;
