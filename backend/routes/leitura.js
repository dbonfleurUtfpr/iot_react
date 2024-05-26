const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');
const { body } = require('express-validator');
const leituraController = require('../controllers/leituraController');

// POST request para criar uma Leitura
router.post('/', authenticateJWT, [
    body('valor').isNumeric().withMessage('Valor deve ser numérico'),
    body('data').optional().isISO8601().withMessage('Data deve ser válida'),
    body('sensor').not().isEmpty().withMessage('ID do sensor é obrigatório')
  ], leituraController.createLeitura);
// GET request para listar todas as Leituras
router.get('/', authenticateJWT, leituraController.listLeituras);
// GET request para obter uma Leitura específica pelo ID
router.get('/:id', authenticateJWT, leituraController.getLeituraById);
// PUT request para atualizar uma Leitura pelo ID
router.put('/:id', authenticateJWT, [
    body('valor').isNumeric().withMessage('Valor deve ser numérico'),
    body('data').optional().isISO8601().withMessage('Data deve ser válida'),
    body('sensor').not().isEmpty().withMessage('ID do sensor é obrigatório')
  ], leituraController.updateLeituraById);
// DELETE request para deletar uma Leitura pelo ID
router.delete('/:id', authenticateJWT, leituraController.deleteLeituraById);
// GET request para obter todas as Leituras de um Sensor específico
router.get('/sensor/:id', leituraController.getLeiturasBySensorId);

module.exports = router;
