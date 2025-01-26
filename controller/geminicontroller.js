const express = require('express');
const geminiPrompt = express.Router();
require('dotenv').config(); 

const API_KEY = process.env.API_KEY;

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are the host of a podcast and create a formatted podcast speech with the information entered." });

geminiPrompt.get('/test', (req,res) =>{
    res.send('Hello')
})

geminiPrompt.post('/', async (req,res) => {
    const prompt = req.body.geminiprompt;
    const result = await model.generateContent(prompt);
    console.log(prompt)
     res.json(result.response.text())
});


module.exports = geminiPrompt;