// Controller will handle all authentication related functions
// verifying user credentials, generating JWT tokens, etc.

// Import the User model
const db = require('../models');
const User = db.User;

// Generate JWT token
const jwt = require('jsonwebtoken');

// Verify JWT token
const bcrypt = require('bcrypt');

// Verify user credentials
exports.login = async (req, res) => { // Add async here
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty!' });
        return;
    }

    try {
        const data = await User.findByEmail(req.body.email); // Update this line
        console.log("findByEmail resolved");

        // Validate password
        const passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
        if (!passwordIsValid) {
            res.status(401).send({ message: 'Invalid credentials' });
        } else {
            // Generate JWT token
            const token = jwt.sign({ id: data.id, role: data.role }, process.env.JWT_SECRET, {
                expiresIn: 86400 // 24 hours
            });

            console.log("JWT token generated");

            res.status(200).send({
                id: data.id,
                email: data.email,
                accessToken: token
            });
        }
    } catch (err) {
        if (err.kind === 'not_found') {
            res.status(401).send({ message: 'Invalid credentials' });
        } else {
            res.status(500).send({ message: 'Error retrieving User with email ' + req.body.email });
        }
    }
};

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
            req.role = decoded.role;
            next();
        }
    });
};

// Compare this snippet from server/routes/userRoutes.js:
// // Desc: User routes
//
