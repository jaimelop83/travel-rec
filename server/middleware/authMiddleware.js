// Middleware function to check for a valid JWT token
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Get the token from the request header
    const token = req.headers['x-access-token'] || req.headers['authorization'];

    // Verify the token
    if (!token) {
        res.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        res.status(401).send({ message: 'Unauthorized' });
    }
};

module.exports = {
    verifyToken,
};