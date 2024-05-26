const Leitura = require('../models/Leitura');
const { validationResult } = require('express-validator');

exports.createLeitura = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newLeitura = new Leitura(req.body);
        const savedLeitura = await newLeitura.save();
        res.status(201).json(savedLeitura);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.listLeituras = async (req, res) => {
    try {
        const leituras = await Leitura.find().populate('sensor');
        res.status(200).json(leituras);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLeituraById = async (req, res) => {
    try {
        const leitura = await Leitura.findById(req.params.id).populate('sensor');
        if (!leitura) return res.status(404).json({ message: 'Leitura not found' });
        res.status(200).json(leitura);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateLeituraById = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const updatedLeitura = await Leitura.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('sensor');
        res.status(200).json(updatedLeitura);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteLeituraById = async (req, res) => {
    try {
        const deletedLeitura = await Leitura.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedLeitura);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLeiturasBySensorId = async (req, res) => {
    try {
        const sensorId = req.params.id;
        const leituras = await Leitura.find({ sensor: sensorId });
        console.log(leituras);
        res.json(leituras);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar leituras por sensor', error });
    }
};
