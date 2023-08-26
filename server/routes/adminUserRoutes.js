// adminUserRoutes.js

const express = require('express');
const router = express.Router();
const AdminUserController = require('../controllers/adminUserController');
const auth = require('../middlewares/adminAuth');
const logOut = require('../middlewares/logoutAuth');
// Signup
router.post('/signup', AdminUserController.signup);

// Login
router.post('/login', AdminUserController.login);

// Get admin profile
router.get('/is-login', auth, AdminUserController.isLogin);

// Log out
router.get('/logout', logOut, AdminUserController.logOut);

router.put('/updateProfile/:userId', AdminUserController.updateProfile);

// Get admin profile
// router.get('/profile',  AdminUserController.getProfile);

// // Update admin profile
// router.put('/profile',  AdminUserController.updateProfile);


// Middleware to authenticate token
// function authenticateToken(req, res, next) {
//   const token = req.headers.authorization.split(' ')[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

module.exports = router;
