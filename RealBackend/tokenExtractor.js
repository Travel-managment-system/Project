// tokenExtractor.js
const tokenExtractor = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      req.token = authHeader.substring(7, authHeader.length); // Extract token
    } else {
      req.token = null;
    }
    next();
  };
  
  module.exports = tokenExtractor;
  