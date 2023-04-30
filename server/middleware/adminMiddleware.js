// Middleware function to check if the user is an admin
const { User } = require("../models");

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.userId } });

    if (user && user.isAdmin) {
      next();
    } else {
      res.status(403).send({ message: "Forbidden: Not an admin" });
    }
  } catch (err) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = {
  verifyAdmin,
};
