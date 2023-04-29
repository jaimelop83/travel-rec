// Setup the routes for the server
const express = require('express');
const router = express.Router();

// Import Controllers
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const recommendationController = require('../controllers/recommendationController');
const openaiController = require('../controllers/openaiController');

// User routes
router.post('/users/register', userController.register);
router.post('/users/login', userController.login);
router.put('/users/:userId', authController.verifyToken, userController.update);


// Recomendation routes
router.get('/recommendations/:userId', authController.verifyToken, recommendationController.getRecommendations);
router.post('/recommendations', authController.verifyToken, recommendationController.createRecommendation);
router.put('/recommendations/:id', authController.verifyToken, recommendationController.updateRecommendation);
router.delete('/recommendations/:id', authController.verifyToken, recommendationController.deleteRecommendation);

// OpenAI routes
router.post('/openai/travel-suggestions', authController.verifyToken, openaiController.getTravelSuggestions);

module.exports = router;