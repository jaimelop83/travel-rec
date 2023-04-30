// Controller will handle all authentication related functions
// verifying user credentials, generating JWT tokens, etc.

// Import the User model
const User = require('../models/user');

// Generate JWT token
const jwt = require('jsonwebtoken');

// Verify JWT token
const bcrypt = require('bcrypt');

// Verify user credentials
exports.login = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty!' });
        return;
    }

    // Validate credentials
    User.findByEmail(req.body.email, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(401).send({ message: 'Invalid credentials' });
            } else {
                res.status(500).send({ message: 'Error retrieving User with email ' + req.body.email });
            }
        } else {
            // Validate password
            const passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
            if (!passwordIsValid) {
                res.status(401).send({ message: 'Invalid credentials' });
            } else {
                // Generate JWT token
                const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
                    expiresIn: 86400 // 24 hours
                });

                res.status(200).send({
                    id: data.id,
                    email: data.email,
                    accessToken: token
                });
            }
        }
    });
}

// Verify JWT token
exports.verifyToken = (req, res, next) => {
    // Get the token from the request header
    const token = req.headers['x-access-token'];

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send({ message: 'Unauthorized' });
        } else {
            req.userId = decoded.id;
            next();
        }
    });
}

// Compare this snippet from server/routes/userRoutes.js:
// // Desc: User routes
//