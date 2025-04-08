const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'chave-secreta-teste';

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.jwt; // Acessa o token no cookie

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verifica o token
    req.user = decoded; // Adiciona os dados do token no req.user
    next(); // Prossegue para a próxima etapa
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

module.exports = authMiddleware;