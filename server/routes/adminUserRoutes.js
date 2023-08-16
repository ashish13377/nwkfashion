// adminUserRoutes.js

const express = require('express');
const router = express.Router();
const AdminUserController = require('../controllers/adminUserController');

// Signup
router.post('/signup', AdminUserController.signup);

// Login
router.post('/login', AdminUserController.login);

// Get admin profile
router.get('/profile', authenticateToken, AdminUserController.getProfile);

// Update admin profile
router.put('/profile', authenticateToken, AdminUserController.updateProfile);


// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
