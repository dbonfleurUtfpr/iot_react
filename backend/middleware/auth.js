const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
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

        req.user = decoded;
        next();
    });
};

module.exports = authenticateJWT;
