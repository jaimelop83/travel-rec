// Description: Controller for admin routes
// define user model
const { User } = require("../models");


// List all users
exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  // delete a user
exports.deleteUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ where: { id: userId } });
      if (user) {
        await user.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  // get a specific user's recommendations
exports.getUserRecommendations = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ where: { id: userId } });
      if (user) {
        const recommendations = await user.getRecommendations();
        res.status(200).json(recommendations);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  }
