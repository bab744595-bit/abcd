const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.body.token;
    console.log('🔵 [AUTH_MIDDLEWARE] Token check:', { hasToken: !!token, tokenLength: token?.length });

    if (!token) {
      console.error('❌ [AUTH_MIDDLEWARE] No token provided in request');
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🟢 [AUTH_MIDDLEWARE] Token verified for userId:', decoded.userId);
    req.userId = decoded.userId;
    req.user = decoded;
    next();
  } catch (error) {
    console.error('❌ [AUTH_MIDDLEWARE] Token verification failed:', error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
