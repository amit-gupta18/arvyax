const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1]; // Assuming the token is sent in the format "Bearer <token>"                                                                              
    if (!token) {
        return res.status(401).json({ message: 'Invalid Login' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }
};

module.exports = authMiddleware;
