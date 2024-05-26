const Pessoa = require('../models/Pessoa');
const { validationResult } = require('express-validator');

exports.createPessoa = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newPessoa = new Pessoa(req.body);
        const savedPessoa = await newPessoa.save();
        res.status(201).json(savedPessoa);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.listPessoas = async (req, res) => {
    try {
        const pessoas = await Pessoa.find();
        res.status(200).json(pessoas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPessoaById = async (req, res) => {
    try {
        const pessoa = await Pessoa.findById(req.params.id);
        if (!pessoa) return res.status(404).json({ message: 'Pessoa not found' });
        res.status(200).json(pessoa);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePessoaById = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedPessoa = await Pessoa.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedPessoa);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePessoaById = async (req, res) => {
    try {
        const deletedPessoa = await Pessoa.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedPessoa);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
