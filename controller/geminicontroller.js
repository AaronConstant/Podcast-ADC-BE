const express = require('express');
const geminiprompt = express.Router();
require('dotenv').config(); 
const { ElevenLabsClient, play } = require("elevenlabs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = process.env.API_KEY;
const Eleven_API = process.env.ELEVEN_API;

const client = new ElevenLabsClient({
    apiKey: Eleven_API
});

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are the host of a podcast and create a formatted podcast speech with the information entered." 
});

geminiprompt.post('/', async (req, res) => {
    const prompt = req.body.geminiprompt;
    const result = await model.generateContent(prompt);
    console.log(prompt);
    res.json(result.response.text());
});

geminiprompt.post('/audio', async (req, res) => {
    try {
        const audioPrompt = req.body.elevenprompt;

        if (!audioPrompt || typeof audioPrompt !== 'string') {
            return res.status(400).json({ error: "Missing or invalid text input for TTS." });
        }

        const audio = await client.textToSpeech.convert({
            text: audioPrompt,
            model_id: "eleven_monolingual_v1",
            output_format: "mp3_44100_128",
        });

        // await play(audio);

        res.json({ audio_url: audio });
    } catch (error) {
        console.error("Error generating audio:", error);
        res.status(500).json({ error: "Failed to generate audio." });
    }
});

module.exports = geminiprompt;