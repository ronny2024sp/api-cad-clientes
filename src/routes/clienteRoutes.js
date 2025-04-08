const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middlewares/authMiddleware'); // Proteção com JWT

// Rotas CRUD para Cliente
// Criar novo cliente
router.post('/', authMiddleware, clienteController.createCliente);

// Listar todos os clientes
router.get('/', authMiddleware, clienteController.getClientes);

// Buscar cliente por ID
router.get('/:id', authMiddleware, clienteController.getClienteById);

// Atualizar cliente por ID
router.put('/:id', authMiddleware, clienteController.updateClienteById);

// Excluir cliente por ID
router.delete('/:id', authMiddleware, clienteController.deleteClienteById);

module.exports = router;