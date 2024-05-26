const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');

// POST request para autenticação
router.post('/login', [
  body('email').isEmail().withMessage('Email é obrigatório e deve ser válido'),
  body('password').not().isEmpty().withMessage('Senha é obrigatória')
], authController.login);

// GET request para verificar o token
router.get('/verify', authController.verifyToken);

module.exports = router;
