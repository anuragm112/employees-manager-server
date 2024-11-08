const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'No token, authorization denied' });

  // Check if the token starts with "Bearer " and extract it
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7, authHeader.length) : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 8687996969);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
