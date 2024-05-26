const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');
const { body } = require('express-validator');
const pessoaController = require('../controllers/pessoaController');

// POST request para criar uma Pessoa
router.post('/', [
    body('nome').not().isEmpty().trim().escape().withMessage('Nome é obrigatório'),
    body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha precisa ter pelo menos 6 caracteres')
  ], pessoaController.createPessoa);
// GET request para listar todas as Pessoas
router.get('/', authenticateJWT, pessoaController.listPessoas);
// GET request para obter uma Pessoa específica pelo ID
router.get('/:id', authenticateJWT, pessoaController.getPessoaById);
// PUT request para atualizar uma Pessoa pelo ID
router.put('/:id', authenticateJWT, [
    body('nome').not().isEmpty().trim().escape().withMessage('Nome é obrigatório'),
    body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha precisa ter pelo menos 6 caracteres')
  ], pessoaController.updatePessoaById);
// DELETE request para deletar uma Pessoa pelo ID
router.delete('/:id', authenticateJWT, pessoaController.deletePessoaById);

module.exports = router;
