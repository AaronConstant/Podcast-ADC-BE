const express = require('express'); 
const loginController = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByUsername,getUserByEmail } = require('../queries/usersQueries');



loginController.use(express.json());
loginController.use(cors());   

loginController.post('/', async (req, res) => {
    const {username,password} = req.body
    const lilSecret = process.env.JWT_SECRET

    const isEmail = username.includes('@')

    try {
        const getUser = await isEmail ? getUserByEmail(username): getUserByUsername(username)
    
        if (!getUser) {
          return res.status(404).json({ error: "No user found with that username/email" });
        }
    
        const passwordPass = await bcrypt.compare(password, getUser.password);
        if (!passwordPass) {
          return res.status(401).json({ error: "Invalid username or password" });
        }
    
        const jwtToken = jwt.sign({ id: getUser.id }, lilSecret, { expiresIn: '30m' });
    
        res.status(200).json({
          message: "Login successful",
          token: jwtToken,
          user: {
            id: getUser.id,
            username: getUser.username,
          }
        });
      } catch (error) {
        console.error("Error in loginController:", error);
        res.status(500).json({ error: "Internal server error" });

    }
 })

 module.exports = loginController;