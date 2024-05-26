const mongoose = require('mongoose');

const dispositivoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  localizacao: { type: String, required: true },
  gateway: { type: mongoose.Schema.Types.ObjectId, ref: 'Gateway' }
});

module.exports = mongoose.model('Dispositivo', dispositivoSchema);