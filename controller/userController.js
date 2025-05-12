const express = require('express');
const userController = express.Router();
const cors = require('cors');
// validations
// import { validateUser } from '../validations/userValidation';

//middleware
userController.use(express.json());
userController.use(cors());

// routes
userController.get('/',async (req, res) => {
    
})

userController.get('/:id', async (req, res) => {
})


module.exports = userController;



