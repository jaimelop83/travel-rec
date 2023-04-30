// Controller to handle recommendations related operations
// Path: server/controllers/recommendationController.js

const { Recommendation } = require("../models");

// Create and save a new Recommendation
exports.createRecommendation = async (recommendationData) => {
  try {
    const recommendation = await Recommendation.create(recommendationData);
    return recommendation;
  } catch (error) {
    throw error;
  }
};

// Retrieve all Recommendations for a specific user
exports.findRecommendationsByUserId = async (userId) => {
  try {
    const recommendations = await Recommendation.findAll({
      where: { userId: userId },
    });
    return recommendations;
  } catch (error) {
    throw error;
  }
};

// Update a Recommendation by ID
exports.updateRecommendation = async (recommendationId, updatedData) => {
  try {
    const recommendation = await Recommendation.update(updatedData, {
      where: { id: recommendationId },
    });
    return recommendation;
  } catch (error) {
    throw error;
  }
};

// Delete a Recommendation by ID
exports.deleteRecommendation = async (recommendationId) => {
  try {
    const result = await Recommendation.destroy({
      where: { id: recommendationId },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createRecommendation: exports.createRecommendation,
  getRecommendations: exports.findRecommendationsByUserId,
  updateRecommendation: exports.updateRecommendation,
  deleteRecommendation: exports.deleteRecommendation,
};