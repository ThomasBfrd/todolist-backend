const jwt = require('jsonwebtoken');
const crypto = require('crypto');

let generateSecretKey = () => {
    return crypto.randomBytes(64).toString('hex');
}

const SECRET_KEY = process.env.SECRET_KEY || generateSecretKey();

exports.SECRET_KEY = SECRET_KEY;
// exports.generateSecretKey = generateSecretKey;


exports.authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, SECRET_KEY)
        const userId = decodedToken.userId;
        req.userId = userId;
        next()
    } catch (error) {
        res.status(401).json({error: 'Requête invalide'})
    }
}