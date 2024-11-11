const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // verificando se o token foi fornecido
  if (!token) {
    return res.status(401).json({ error: 'Acesso negado! Token não fornecido.' });
  }

  // se o token foi fornecido, verificará se ele é válido
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido.' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
