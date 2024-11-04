const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido, acesso negado!' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded; // Atribui as info do user decodificado à requisição
    next(); // Chama o próximo middleware ou a rota desejada
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido!' });
  }
};

module.exports = authMiddleware;