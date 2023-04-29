// controller to handle user related operations

const User = require('../models/userModel');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty!' });
        return;
    }

    // Create a User
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active
    });

    // Save User in the database
    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || 'Some error occurred while creating the User.' });
        } else {
            res.send(data);
        }
    });
}

// Retrieve all Users from the database
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || 'Some error occurred while retrieving users.' });
        } else {
            res.send(data);
        }
    });
}

// Find a single User with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({ message: `Not found User with id ${req.params.userId}.` });
            } else {
                res.status(500).send({ message: `Error retrieving User with id ${req.params.userId}.` });
            }
        } else {
            res.send(data);
        }
    });
}

// Update a User identified by the userId in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty!' });
        return;
    }

    User.updateById(req.params.userId, new User(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({ message: `Not found User with id ${req.params.userId}.` });
            } else {
                res.status(500).send({ message: `Error updating User with id ${req.params.userId}.` });
            }
        } else {
            res.send(data);
        }
    });
}

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({ message: `Not found User with id ${req.params.userId}.` });
            } else {
                res.status(500).send({ message: `Could not delete User with id ${req.params.userId}.` });
            }
        } else {
            res.send({ message: `User was deleted successfully!` });
        }
    });
}

// Delete all Users from the database
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || 'Some error occurred while removing all users.' });
        } else {
            res.send({ message: `All Users were deleted successfully!` });
        }
    });
}

// Find all active Users
exports.findAllActive = (req, res) => {
    User.getAllActive((err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || 'Some error occurred while retrieving users.' });
        } else {
            res.send(data);
        }
    });
}

// Path: server/routes/userRoutes.js