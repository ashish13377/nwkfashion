// adminUserController.js

const AdminUser = require('../config/models/adminUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const adminUserController = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const adminUser = new AdminUser({ name, email, password });
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
  
      // Generate JWT token
      const token = await adminUser.generateAuthToken();
  
      // Set the JWT token as a cookie
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 50000000),
        sameSite: "None",
        secure: true,
        httpOnly: true,
      });
  
      // Send response
      res.status(200).json({ message: "User Login Succesfully 😃!", token });

  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  

  // Get admin profile
  getProfile: async (req, res) => {
    try {
      const userId = req.user.userId; // Extracted from the decoded token
      const adminUser = await AdminUser.findById(userId);

      if (!adminUser) {
        return res.status(404).json({ message: 'Admin user not found' });
      }

      res.json(adminUser);

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Update admin profile
  updateProfile: async (req, res) => {
    try {
      const userId = req.user.userId; // Extracted from the decoded token
      const updates = req.body;

      const adminUser = await AdminUser.findByIdAndUpdate(userId, updates, { new: true });

      if (!adminUser) {
        return res.status(404).json({ message: 'Admin user not found' });
      }

      res.json(adminUser);

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  
  isLogin: async (req, res) => {
    try {
      const loggedInAdmin = req.rootUser; // Access the root admin user attached by the auth middleware
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
      
      req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
        return curelem.token !== req.token;
      });

      res.clearCookie("jwt", { path: "/" });

      await req.rootUser.save();

      res.status(200).json({ message: "Logout successful 😃" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

};



module.exports = adminUserController;
