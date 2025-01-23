const express = require('express');
const geminiPrompt = express.Router();
require('dotenv').config(); 

const API_KEY = process.env.API_KEY;

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

geminiPrompt.get('/test', (req,res) =>{
    res.send('Hello')
})

// For AI to generate a response to a prompt you will require it to  POST from the API. Best Practice is to send the request as a post for proper syntax. 
geminiPrompt.post('/', async (req,res) => {
    const prompt = req.body.geminiprompt;
    const result = await model.generateContent(prompt);
     res.json(result.response.text())
});


module.exports = geminiPrompt;