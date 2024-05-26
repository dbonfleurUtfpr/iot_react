const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');
const { body } = require('express-validator');
const gatewayController = require('../controllers/gatewayController');

// POST request para criar um Gateway
router.post('/', authenticateJWT, [
    body('descricao').not().isEmpty().withMessage('Descrição é obrigatória'),
    body('endereco').not().isEmpty().withMessage('Endereço é obrigatório'),
    body('pessoa').not().isEmpty().withMessage('ID da pessoa é obrigatório')
  ], gatewayController.createGateway);
// GET request para listar todos os Gateways
router.get('/', authenticateJWT, gatewayController.listGateways);
// GET request para obter um Gateway específico pelo ID
router.get('/:id', authenticateJWT, gatewayController.getGatewayById);
// PUT request para atualizar um Gateway pelo ID
router.put('/:id', authenticateJWT, [
    body('descricao').not().isEmpty().withMessage('Descrição é obrigatória'),
    body('endereco').not().isEmpty().withMessage('Endereço é obrigatório'),
    body('pessoa').not().isEmpty().withMessage('ID da pessoa é obrigatório')
  ], gatewayController.updateGatewayById);
// DELETE request para deletar um Gateway pelo ID
router.delete('/:id', authenticateJWT, gatewayController.deleteGatewayById);

module.exports = router;
