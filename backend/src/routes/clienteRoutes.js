const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', clienteController.createCliente);
router.get('/', authMiddleware, clienteController.getAllClientes);
router.get('/:id', authMiddleware, clienteController.getClienteById);
router.put('/:id', authMiddleware, clienteController.updateCliente);
router.delete('/:id', authMiddleware, clienteController.deleteCliente);

module.exports = router;