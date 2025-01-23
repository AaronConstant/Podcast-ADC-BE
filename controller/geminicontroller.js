const express = require('express');
const geminiPrompt = express.Router();
const 

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

geminiPrompt.get('/transcript', async (req,res) => {
    const prompt = req.body;
    const result = await model.generateContent(prompt);
    return result.response.text()
});


module.exports = geminiPrompt;