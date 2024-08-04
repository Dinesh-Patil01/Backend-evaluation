const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secretKey = 'abcd1234';

const authenticateJWT = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Token is not valid' });
    }
  } else {
    res.status(401).json({ message: 'No token, authorization denied' });
  }
};

module.exports = { authenticateJWT };
