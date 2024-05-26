const Dispositivo = require('../models/Dispositivo');
const { validationResult } = require('express-validator');

exports.createDispositivo = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newDispositivo = new Dispositivo(req.body);
        const savedDispositivo = await newDispositivo.save();
        res.status(201).json(savedDispositivo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.listDispositivos = async (req, res) => {
    try {
        const dispositivos = await Dispositivo.find().populate('gateway');
        res.status(200).json(dispositivos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDispositivoById = async (req, res) => {
    try {
        const dispositivo = await Dispositivo.findById(req.params.id).populate('gateway');
        if (!dispositivo) return res.status(404).json({ message: 'Dispositivo not found' });
        res.status(200).json(dispositivo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateDispositivoById = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedDispositivo = await Dispositivo.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('gateway');
        res.status(200).json(updatedDispositivo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteDispositivoById = async (req, res) => {
    try {
        const deletedDispositivo = await Dispositivo.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedDispositivo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDispositivosByGatewayId = async (req, res) => {
    try {
      const gatewayId = req.params.id;
      const dispositivos = await Dispositivo.find({ gateway: gatewayId });
      res.json(dispositivos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar dispositivos por gateways', error });
    }
  };
