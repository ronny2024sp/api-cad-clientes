const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authMiddleware = require('../middlewares/authMiddleware'); // Proteção com JWT

// Rotas CRUD para User
// Criar novo role
router.post('/', authMiddleware, roleController.createUser);

// Listar role 
router.get('/', authMiddleware, roleController.getUsers);

// Buscar usuário por ID
router.get('/:id', authMiddleware, roleController.getUserById);

// Atualizar role por ID
router.put('/:id', authMiddleware, roleController.updateUserById);

// Excluir role por ID
router.delete('/:id', authMiddleware, roleController.deleteUserById); 

module.exports = router;