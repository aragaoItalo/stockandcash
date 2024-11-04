const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedorController');

router.post('/', fornecedorController.createFornecedor);
router.get('/', fornecedorController.getAllFornecedores);
router.get('/:id', fornecedorController.getFornecedorById);
router.put('/:id', fornecedorController.updateFornecedor);
router.delete('/:id', fornecedorController.deleteFornecedor);

module.exports = router;