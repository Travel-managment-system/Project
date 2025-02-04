const jwt = require('jsonwebtoken');
const config = require('./config'); // Adjust the path as necessary

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user; // Attach the user info to the request object
    next();
  });
};

module.exports = authenticateToken;
