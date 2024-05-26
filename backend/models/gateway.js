const mongoose = require('mongoose');

const gatewaySchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  endereco: { type: String, required: true, unique: true, maxlength: 100 },
  pessoa: { type: mongoose.Schema.Types.ObjectId, ref: 'Pessoa', required: true }
});

module.exports = mongoose.model('Gateway', gatewaySchema);
