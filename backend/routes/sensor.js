const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');
const { body } = require('express-validator');
const sensorController = require('../controllers/sensorController');

// POST request para criar um Sensor
router.post('/', authenticateJWT, [
    body('nome').not().isEmpty().withMessage('Nome é obrigatório'),
    body('tipo').not().isEmpty().withMessage('Tipo é obrigatório'),
    body('ligado').isBoolean().withMessage('Ligado deve ser booleano'),
    body('dispositivo').not().isEmpty().withMessage('ID do dispositivo é obrigatório')
  ], sensorController.createSensor);
// GET request para listar todos os Sensores
router.get('/', authenticateJWT, sensorController.listSensors);
// GET request para obter um Sensor específico pelo ID
router.get('/:id', authenticateJWT, sensorController.getSensorById);
// PUT request para atualizar um Sensor pelo ID
router.put('/:id', authenticateJWT, [
    body('nome').not().isEmpty().withMessage('Nome é obrigatório'),
    body('tipo').not().isEmpty().withMessage('Tipo é obrigatório'),
    body('ligado').isBoolean().withMessage('Ligado deve ser booleano'),
    body('dispositivo').not().isEmpty().withMessage('ID do dispositivo é obrigatório')
  ], sensorController.updateSensorById);
// PUT request para alternar o status de um Sensor pelo ID
router.put('/toggle-status/:id', sensorController.toggleSensorStatus);
// DELETE request para deletar um Sensor pelo ID
router.delete('/:id', authenticateJWT, sensorController.deleteSensorById);
// GET request para obter todos os Sensores de um Dispositivo específico
router.get('/dispositivo/:id', sensorController.getSensoresByDispositivoId);

module.exports = router;
