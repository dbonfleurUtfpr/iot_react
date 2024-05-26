const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  nome: { type: String, required: true, maxlength: 150 },
  tipo: { type: String, required: true, maxlength: 300 },
  ligado: { type: Boolean, default: false },
  dispositivo: { type: mongoose.Schema.Types.ObjectId, ref: 'Dispositivo' }
});

module.exports = mongoose.model('Sensor', sensorSchema);
