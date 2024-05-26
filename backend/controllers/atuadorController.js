const Atuador = require('../models/Atuador');
const { validationResult } = require('express-validator');

exports.createAtuador = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newAtuador = new Atuador(req.body);
        const savedAtuador = await newAtuador.save();
        res.status(201).json(savedAtuador);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.listAtuadores = async (req, res) => {
    try {
        const atuadores = await Atuador.find().populate('dispositivo');
        res.status(200).json(atuadores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAtuadorById = async (req, res) => {
    try {
        const atuador = await Atuador.findById(req.params.id).populate('dispositivo');
        if (!atuador) return res.status(404).json({ message: 'Atuador not found' });
        res.status(200).json(atuador);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAtuadorById = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedAtuador = await Atuador.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('dispositivo');
        res.status(200).json(updatedAtuador);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAtuadorById = async (req, res) => {
    try {
        const deletedAtuador = await Atuador.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedAtuador);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
