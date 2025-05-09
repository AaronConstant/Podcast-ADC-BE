const express = require('express');
const cors = require('cors');
const geminiprompt = express.Router();
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
// const fetch = require('node-fetch'); 
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY)
const textToSpeech = require('@google-cloud/text-to-speech');
const ttsClient = new textToSpeech.TextToSpeechClient();
// const fs = require('fs');
// const util = require('util');
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
        const textResponse = result.response.text();

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
    const { googleCloudTTS } = req.body
    
    try {
        // console.log("Incoming request body: ", req.body)
        console.log("BE-Line 61 TTS prompt: ",googleCloudTTS)

        if (!googleCloudTTS || typeof googleCloudTTS !== 'string') {
            return res.status(400).json({ error: "Missing or invalid text input for TTS." });
        }

        const request = {
            input: { text: googleCloudTTS },
            voice: {
                languageCode: 'en-US',
                name: 'en-US-Wavenet-F',
                ssmlGender: 'FEMALE'
            },
            audioConfig: {
                audioEncoding: 'MP3'
            }
        };

        const [response, metadata] = await ttsClient.synthesizeSpeech(request);

        console.log(response);
        //   console.dir(metadata, { depth: null }); <-- can be used to log the whole structure of the nested objects. Debugging purposes.
        console.log(metadata, {default: null});
        console.log("Audio content length:", response.audioContent.length);
        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Disposition': 'inline; filename="output.mp3"',
        });
        res.status(200).send(response.audioContent);
        console.log("Audio sent successfully.");
    } catch (error) {
        console.error("Error generating audio:", error);
        res.status(500).json({ error: "Failed to generate audio." });
    } // Notes for later about Saving by creating files to store them. //

    // This allows you to use await writeFile(...) instead of the older callback-style.
    // const writeFile = util.promisify(fs.writeFile);

    // This saves the audio content returned by Google Cloud TTS to a file named output.mp3.
    // await writeFile('output.mp3', response.audioContent, 'binary');

    // This reads the file back into memory so it can be sent in a response with res.send(file)
    // const file = fs.readFileSync('output.mp3')
    // Commented ElevenLabs code for separation to introduce Google Cloud TTS
    // try {
    //     const audioPrompt = req.body.elevenprompt;


    //     console.log("Incoming request body:", req.body);

    //     if (!audioPrompt || typeof audioPrompt !== 'string') {
    //         return res.status(400).json({ error: "Missing or invalid text input for TTS." });
    //     }

    //     console.log("Sending text to ElevenLabs:", audioPrompt);

    //     const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'xi-api-key': ELEVEN_API, 
    //         },
    //         body: JSON.stringify({
    //             text: audioPrompt,
    //             model_id: "eleven_monolingual_v1", 
    //             voice_settings: {
    //                 stability: 0.5, 
    //                 similarity_boost: 0.5, 
    //             },
    //         }),
    //     });

    //     if (!response.ok) {
    //         const errorData = await response.json();
    //         console.error("ElevenLabs API error response:", errorData);
    //         throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.detail || 'Unknown error'}`);
    //     }

    //     const arrayBuffer = await response.arrayBuffer();

    //     console.log("Generated audio data (ArrayBuffer):", arrayBuffer);

    //     res.set('Content-Type', 'audio/mpeg'); 
    //     res.send(Buffer.from(arrayBuffer)); 
    // } catch (error) {}
});

module.exports = geminiprompt;