// Middleware function to check if the user is an admin
const { User } = require("../models");

const verifyAdmin = async (req, res, next) => {
  console.log("Executing Verify Admin");
  try {
    const user = await User.findOne({ where: { id: req.userId } });
    console.log("User Found: ", user);

    if (user && user.role === "admin") {
      console.log("User is an admin");
      next();
    } else {
      console.log("User is not an admin");
      res.status(403).send({ message: "Forbidden: Not an admin" });
    }
  } catch (err) {
    console.log("Error in verifyAdmin: ", err);
    res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = {
  verifyAdmin,
};
