const express = require('express');
const cors = require('cors');
const geminiprompt = express.Router();
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fetch = require('node-fetch'); 
const API_KEY = process.env.API_KEY;
const ELEVEN_API = process.env.ELEVEN_API;

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

        const structuredPrompt = `
            ${prompt}
            Format the output as a JSON object with the following structure:
            {
                "title": "Podcast Title",
                "introduction": "Brief introduction to the topic",
                "mainContent": "Detailed content of the podcast",
                "conclusion": "Summary and closing remarks"
            }
            Return only the JSON object without any additional text or markdown formatting.
        `;

        const result = await model.generateContent(structuredPrompt);
        const textResponse = await result.response.text();

        let jsonResponse = textResponse.trim();

        if (jsonResponse.startsWith('```json')) {
            jsonResponse = jsonResponse.slice(7); 
        }
        if (jsonResponse.endsWith('```')) {
            jsonResponse = jsonResponse.slice(0, -3); 
        }

        const structuredResponse = JSON.parse(jsonResponse);

        console.log("Structured Response:", structuredResponse);
        res.json(structuredResponse);
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

        const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': ELEVEN_API, 
            },
            body: JSON.stringify({
                text: audioPrompt,
                model_id: "eleven_monolingual_v1", 
                voice_settings: {
                    stability: 0.5, 
                    similarity_boost: 0.5, 
                },
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("ElevenLabs API error response:", errorData);
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.detail || 'Unknown error'}`);
        }

        const arrayBuffer = await response.arrayBuffer();

        console.log("Generated audio data (ArrayBuffer):", arrayBuffer);

        res.set('Content-Type', 'audio/mpeg'); 
        res.send(Buffer.from(arrayBuffer)); 
    } catch (error) {
        console.error("Error generating audio:", error);
        res.status(500).json({ error: "Failed to generate audio." });
    }
});

module.exports = geminiprompt;