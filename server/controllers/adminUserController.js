// adminUserController.js

const AdminUser = require('../config/models/adminUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminUserController = {
  signup: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if a user with the same email already exists
      const existingUser = await AdminUser.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
      }

      const adminUser = new AdminUser({ email, password });
      await adminUser.save();

      res.status(201).json({ message: 'Admin user created successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const adminUser = await AdminUser.findOne({ email });

      if (!adminUser) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const isPasswordValid = await bcrypt.compare(password, adminUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      const token = await adminUser.generateAuthToken();

      // Set the JWT token as a cookie
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 50000000), // Set the expiry time as needed
        sameSite: "None", // Adjust as needed
        secure: true, // Set as needed
        httpOnly: true,
      });

      res.status(200).json({ message: "User Login Successfully 😃!" });

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getProfile: async (req, res) => {
    try {
      // The authenticated user's ID is available from the middleware
      const userId = req.user._id;

      const adminUser = await AdminUser.findById(userId);

      if (!adminUser) {
        return res.status(404).json({ message: 'Admin user not found' });
      }

      res.json(adminUser);

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { Companyname, Adminname, phone, dateofBirth, companyaddres } = req.body;
      
      const updates = {
        Companyname,
        Adminname,
        phone,
        dateofBirth,
        companyaddres
      };
  
      const adminUser = await AdminUser.findByIdAndUpdate(userId, updates, { new: true });
  
      if (!adminUser) {
        return res.status(404).json({ message: 'Admin user not found' });
      }
  
      res.status(200).json(adminUser);
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  isLogin: async (req, res) => {
    try {
      // The authenticated user's data is available from the middleware
      const loggedInAdmin = req.rootUser;

      if (!loggedInAdmin) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      
      res.status(200).json({ message: 'User is logged in', user: loggedInAdmin });
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  logOut: async (req, res) => {
    try {
      // The authenticated user's data is available from the middleware
      req.rootUser.tokens = req.rootUser.tokens.filter(token => token.token !== req.token);

      // Clear JWT cookie
      res.clearCookie("jwt");

      await req.user.save();

      res.status(200).json({ message: "Logout successful 😃" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

};



module.exports = adminUserController;
