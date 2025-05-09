const express = require('express');
const userController = express.Router();
const cors = require('cors');
const { user } = require('elevenlabs/api');

userController.use(express.json());
userController.use(cors());

userController.post('/user', async (req, res) => {
    const { userId, name, email } = req.body;
    



})





