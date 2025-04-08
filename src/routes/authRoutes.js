const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota de login
router.post('/login', authController.login);

// Rota protegida de exemplo
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Você acessou uma rota protegida!', user: req.user });
});

module.exports = router;