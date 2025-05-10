const express = require('express');
const userController = express.Router();
const cors = require('cors');
const { user } = require('elevenlabs/api');

userController.use(express.json());
userController.use(cors());

userController.get('/user', async (req, res) => {
    





})





