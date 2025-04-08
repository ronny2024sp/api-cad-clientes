const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); // Proteção com JWT

// Rotas CRUD para User
// Criar novo usuário
router.post('/', authMiddleware, userController.createUser);

// Listar usuários 
router.get('/', authMiddleware, userController.getUsers);

// Buscar usuário por ID
router.get('/:id', authMiddleware, userController.getUserById);

// Atualizar usuário por ID
router.put('/:id', authMiddleware, userController.updateUserById);

// Excluir usuário por ID
router.delete('/:id', authMiddleware, userController.deleteUserById); 

module.exports = router;