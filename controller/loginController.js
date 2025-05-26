require('dotenv').config()
const express = require('express'); 
const loginController = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByUsername,getUserByEmail } = require('../queries/loginQueries');

loginController.use(express.json());

loginController.post('/', async (req, res) => {
    console.log('Line 12: ',req.body)
    const {username,password} = req.body
    
    const isEmail = username.includes('@')
    
    try {
        const getUser = await (isEmail ? getUserByEmail(username): getUserByUsername(username));
        console.log('Line 19- LoginC success Finding User:', getUser); 
        if (!getUser) {
            return res.status(404).json({ error: "No user found with that username/email" });
        }
        console.log(getUser.password)
        
        const passwordPass = await bcrypt.compare(password, getUser.password);
        console.log(`Line 26 LoginC - User password pass: ${passwordPass}`);
        
        if (!passwordPass) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        
        const lilSecret = process.env.JWT_SECRET
        // { expiresIn: '30m' }
        const jwtAccessToken = jwt.sign({ id: getUser.id }, lilSecret);
        console.log(`Line 33 loginC - Token for User ${getUser.first_name}: ${jwtAccessToken}`)
        res.status(200).json({
          message: "Login successful",
          token: jwtAccessToken,
          user: {
            id: getUser.id,
            firstName: getUser.first_name,
            lastName: getUser.last_name
          }
        });
      } catch (error) {
        console.error("Error in loginController:", error);
        res.status(500).json({ error: "Internal server error" });

    }
 })

 module.exports = loginController;