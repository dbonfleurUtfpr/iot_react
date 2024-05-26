const mongoose = require('mongoose');

const atuadorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  dispositivo: { type: mongoose.Schema.Types.ObjectId, ref: 'Dispositivo', required: true }
});

module.exports = mongoose.model('Atuador', atuadorSchema);
