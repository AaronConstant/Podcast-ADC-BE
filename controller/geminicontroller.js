const express = require('express');
const cors = require('cors');
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

geminiprompt.use(express.json());
geminiprompt.use(cors());

geminiprompt.post('/', async (req, res) => {
    try {
        const prompt = req.body.geminiprompt;
        const result = await model.generateContent(prompt);
        const textResponse = await result.response.text(); 
        console.log(prompt);
        res.json(textResponse);
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Failed to generate content." });
    }
});

geminiprompt.post('/audio', async (req, res) => {
    try {
        const audioPrompt = req.body.elevenprompt;

        console.log("Incoming request body:", req.body);

        if (!audioPrompt || typeof audioPrompt !== 'string') {
            return res.status(400).json({ error: "Missing or invalid text input for TTS." });
        }
        console.log("Sending text to ElevenLabs:", audioPrompt);
        const audio = await client.textToSpeech.convert({
            text: audioPrompt,
            voice_id:"default",
            model_id: "eleven_monolingual_v1",
            output_format: "mp3_44100_128",
        });

        console.log("Generated audio data:", audio);

        if (!audio) {
            return res.status(500).json({ error: "Failed to generate audio." });
        }

        await play(audio);

        console.log("Sending audio URL to frontend:", audio);
        
        res.json({ audio_url: audio });
    } catch (error) {
        console.error("Error generating audio:", error);
        res.status(500).json({ error: "Failed to generate audio." });
    }
});

module.exports = geminiprompt;