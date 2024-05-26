const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');
const { body } = require('express-validator');
const dispositivoController = require('../controllers/dispositivoController');

// POST request para criar um Dispositivo
router.post('/', authenticateJWT, [
    body('nome').not().isEmpty().withMessage('Nome é obrigatório'),
    body('localizacao').not().isEmpty().withMessage('Localização é obrigatória'),
    body('gateway').not().isEmpty().withMessage('ID do gateway é obrigatório')
  ], dispositivoController.createDispositivo);
// GET request para listar todos os Dispositivos
router.get('/', authenticateJWT, dispositivoController.listDispositivos);
// GET request para obter um Dispositivo específico pelo ID
router.get('/:id', authenticateJWT, dispositivoController.getDispositivoById);
// PUT request para atualizar um Dispositivo pelo ID
router.put('/:id', authenticateJWT, [
    body('nome').not().isEmpty().withMessage('Nome é obrigatório'),
    body('localizacao').not().isEmpty().withMessage('Localização é obrigatória'),
    body('gateway').not().isEmpty().withMessage('ID do gateway é obrigatório')
  ], dispositivoController.updateDispositivoById);
// DELETE request para deletar um Dispositivo pelo ID
router.delete('/:id', authenticateJWT, dispositivoController.deleteDispositivoById);
// GET request para listar todos os Gateways de um Dispositivo específico
router.get('/gateway/:id', dispositivoController.getDispositivosByGatewayId);

module.exports = router;
