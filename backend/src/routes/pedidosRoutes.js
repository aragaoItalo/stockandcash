const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidoController');


router.post('/', pedidosController.criarPedido);
router.get('/', pedidosController.listarPedidos);

module.exports = router;