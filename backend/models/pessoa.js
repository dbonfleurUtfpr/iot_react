const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const pessoaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true }
});

// Hashing da senha antes de salvar
pessoaSchema.pre('save', async function(next) {
    if (this.isModified('senha') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
    }
    next();
});

// Método para verificar a senha no login
pessoaSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.senha);
};

const Pessoa = mongoose.model('Pessoa', pessoaSchema);

module.exports = Pessoa;
