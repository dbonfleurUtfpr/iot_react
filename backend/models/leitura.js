const mongoose = require('mongoose');

const leituraSchema = new mongoose.Schema({
  valor: { type: Number, required: true },
  data: { type: Date, default: Date.now, required: true },
  sensor: { type: mongoose.Schema.Types.ObjectId, ref: 'Sensor', required: true }
});

module.exports = mongoose.model('Leitura', leituraSchema);
