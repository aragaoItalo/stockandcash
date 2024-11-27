const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidoController');


router.post('/', pedidosController.criarPedido);

module.exports = router;