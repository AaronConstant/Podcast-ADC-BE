const express = require('express');
const userController = express.Router();
const cors = require('cors');
const { user } = require('elevenlabs/api');
// validations
// import { validateUser } from '../validations/userValidation';

//middleware
userController.use(express.json());
userController.use(cors());

// routes
userController.get('/user',async (req, res) => {
    





})





