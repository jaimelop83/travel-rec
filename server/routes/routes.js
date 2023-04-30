// Setup the routes for the server
const express = require('express');
const router = express.Router();

// Import Controllers
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const recommendationController = require('../controllers/recommendationController');
const openaiController = require('../controllers/openaiController');
const adminController = require('../controllers/adminController');

// import middleware
const { verifyAdmin } = require('../middleware/adminMiddleware');

// Admin routes
router.get('/admin/users', (req, res, next) => {
    console.log('Request Received at /admin/users');
    authController.verifyToken(req, res, () => {
        verifyAdmin(req, res, next);
    });
}, adminController.getAllUsers);
router.delete('/admin/users/:userId', authController.verifyToken, verifyAdmin, adminController.deleteUser);
router.get('/admin/users/:userId/recommendations', authController.verifyToken, verifyAdmin, adminController.getUserRecommendations);
router.post('/users/register-admin', userController.createAdmin);


// User routes
router.post('/users/register', userController.create);
router.post('/users/login', authController.login);
router.put('/users/:userId', authController.verifyToken, userController.update);
router.get('/users', authController.verifyToken, userController.findAll);


// Recomendation routes
router.get('/recommendations/:userId', authController.verifyToken, async (req, res, next) => {
    try {
        const recommendations = await recommendationController.findRecommendationsByUserId(req.params.userId);
        res.json(recommendations);
    } catch (error) {
        next(error);
    }
});


router.post('/recommendations', authController.verifyToken, async (req, res, next) => {
    try {
        const recommendation = await recommendationController.createRecommendation(req.body);
        res.json(recommendation);
    } catch (error) {
        next(error);
    }
});


router.put('/recommendations/:id', authController.verifyToken, async (req, res, next) => {
    try {
        const recommendation = await recommendationController.updateRecommendation(req.params.id, req.body);
        res.json(recommendation);
    } catch (error) {
        next(error);
    }
});


router.delete('/recommendations/:id', authController.verifyToken, async (req, res, next) => {
    try {
        const result = await recommendationController.deleteRecommendation(req.params.id);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

// OpenAI routes
router.post('/openai/travel-suggestions', authController.verifyToken, openaiController.getTravelSuggestions);

module.exports = router;