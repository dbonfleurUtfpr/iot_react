const Gateway = require('../models/Gateway');
const { validationResult } = require('express-validator');

exports.createGateway = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newGateway = new Gateway(req.body);
        const savedGateway = await newGateway.save();
        res.status(201).json(savedGateway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.listGateways = async (req, res) => {
    try {
        const gateways = await Gateway.find().populate('pessoa');
        res.status(200).json(gateways);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getGatewayById = async (req, res) => {
    try {
        const gateway = await Gateway.findById(req.params.id).populate('pessoa');
        if (!gateway) return res.status(404).json({ message: 'Gateway not found' });
        res.status(200).json(gateway);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateGatewayById = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedGateway = await Gateway.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('pessoa');
        res.status(200).json(updatedGateway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteGatewayById = async (req, res) => {
    try {
        const deletedGateway = await Gateway.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedGateway);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
