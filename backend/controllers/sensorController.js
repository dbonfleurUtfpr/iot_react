const Sensor = require('../models/Sensor');
const { validationResult } = require('express-validator');

exports.createSensor = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newSensor = new Sensor(req.body);
        const savedSensor = await newSensor.save();
        res.status(201).json(savedSensor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.listSensors = async (req, res) => {
    try {
        const sensors = await Sensor.find();
        res.status(200).json(sensors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSensorById = async (req, res) => {
    try {
        const sensor = await Sensor.findById(req.params.id);
        if (!sensor) return res.status(404).json({ message: 'Sensor not found' });
        res.status(200).json(sensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSensorById = async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedSensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedSensor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSensorById = async (req, res) => {
    try {
        const deletedSensor = await Sensor.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedSensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.toggleSensorStatus = async (req, res) => {
    try {
        const sensor = await Sensor.findById(req.params.id);
        if (!sensor) {
            return res.status(404).json({ message: 'Sensor não encontrado' });
        }

        sensor.ligado = !sensor.ligado;
        await sensor.save();

        res.json(sensor);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

exports.getSensoresByDispositivoId = async (req, res) => {
    try {
        const dispositivoId = req.params.id;
        const sensores = await Sensor.find({ dispositivo: dispositivoId });
        res.json(sensores);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar sensores por dispositivos', error });
    }
};
