const jwt = require('jsonwebtoken');
const Pessoa = require('../models/Pessoa');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const pessoa = await Pessoa.findOne({ email });
        if (!pessoa) {
            return res.status(401).json({ message: 'Autenticação falhou - Email' });
        }

        const isValid = await pessoa.isValidPassword(password);

        if (!isValid) {
            return res.status(401).json({ message: 'Autenticação falhou - Senha' });
        }

        const token = jwt.sign(
            { pessoaId: pessoa._id, email: pessoa.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, userId: pessoa._id });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

exports.verifyToken = (req, res) => {
    let token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        res.json({ message: 'Token válido', decoded });
    });
};
