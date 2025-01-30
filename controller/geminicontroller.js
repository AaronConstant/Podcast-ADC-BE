const express = require('express');
const geminiprompt = express.Router();
require('dotenv').config(); 

const API_KEY = process.env.API_KEY;

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are the host of a podcast and create a formatted podcast speech with the information entered." });

    
    geminiprompt.post('/', async (req,res) => {
        const prompt = req.body.geminiprompt;
        const result = await model.generateContent(prompt);
        console.log(prompt)
        res.json(result.response.text())
    });

    geminiprompt.post('/audio', async(req,res)=> {
        const audioPrompt = req.body.elevenprompt;
        const audio = await client.textToSpeech.convert( "JBFqnCBsd6RMkjVDRZzb", {
            text: audioPrompt,
            model_id: "eleven_monolingual_v1",
            output_format:"mp3_44100_128",
        
        });
        await play(audio);
    })
    
    geminiprompt.get('/test', (req,res) =>{
        res.send('Hello')
    })

module.exports = geminiprompt;