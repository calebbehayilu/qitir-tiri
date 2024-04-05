const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Token not found");

  try {
    const decoded = jwt.verify(token, "keyjson");
    req.user = decoded;
    next();
  } catch (err) {}
};
