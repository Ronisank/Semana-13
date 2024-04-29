const {verify} = require("jsonwebtoken");

async function auth(req, res, next) {
    try {    
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token not provided!' });
    }
        const payload = verify(token, process.env.SECRET);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalid!' });
    }
}

module.exports = auth;