const jwt = require("jsonwebtoken");
const JWT_KEY =
  "c9d5abfeb26796f0979acd756bb4a71b12fe4c8dd4dd6556968b8047c316ad0e";

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);

    req.user_id = decodedToken.id;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Invalid auth token");
  }
};

module.exports = authenticate;
