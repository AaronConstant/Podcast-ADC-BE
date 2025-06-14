// * Setting Environment
const express = require('express');
const cors = require('cors');
const podcastEntryController = express.Router({mergeParams: true});
require('dotenv').config();
const API_KEY = process.env.GEMINI_API_KEY;

// * Queries and Token
const {
    getAllEntries,
    getSpecificEntry,
    createEntry,
    updateEntry,
    deleteEntry
} = require('../queries/podcastEntriesQueries')
const { AuthenticateToken } = require('../validations/UserTokenAuth');

// * Gemini content Creation variables
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(API_KEY)
const textToSpeech = require('@google-cloud/text-to-speech');
const ttsClient = new textToSpeech.TextToSpeechClient();
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are the host of a podcast and create a formatted podcast speech with the information entered."
});

podcastEntryController.use(express.json());
podcastEntryController.use(cors());

podcastEntryController.get('/',AuthenticateToken, async (req, res) => {
    const { user_id } = req.params;
    try {
        const entries = await getAllEntries(user_id);
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

podcastEntryController.get('/:id',AuthenticateToken, async (req, res) => {
    const { id, user_id } = req.params;
    try {
        const entry = await getSpecificEntry(id, user_id);
        res.status(200).json(entry);
    } catch (error) {
        res.status(404).json({ error: "Entry not found" });
    }
});

podcastEntryController.post('/', async (req, res) => {
    const { user_id } = req.params;
    console.log(user_id);
    
    const entryData = req.body;
    try {
        const newEntry = await createEntry(user_id, entryData);
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

podcastEntryController.put('/:id', async (req, res) => {
    const { id, user_id } = req.params;
    const entryData = req.body;
    try {
        const updated = await updateEntry(id, user_id, entryData);
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

podcastEntryController.delete('/:id', async (req, res) => {
    const { id, user_id } = req.params;
    try {
        const deleted = await deleteEntry(id, user_id);
        res.status(200).json({message:"SUccessfully deleted Podcast!",deleted});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

podcastEntryController.post('/script',AuthenticateToken, async (req, res) => {
    try {
        const {podcastentry, mood} = req.body;
        // ! Debugging console logs
        // console.log("Line 97--Podcast Entry Data:", req.body);
        // console.log("Line 97--Prompt:", podcastentry);
        // console.log("Line 98--Mood:", mood);
        const structuredPrompt = `
            ${podcastentry}
            The mood of the podcast is "${mood}".
            Format the output as a JSON object with the following structure:
            {
                "title": "Podcast Title",
                "description": Brief description of what the topic will be about,
                "introduction": "Brief introduction to the topic",
                "mainContent": "Detailed content of the podcast",
                "conclusion": "Summary and closing remarks"
            }
            Return only the JSON object without any additional text or markdown formatting.
        `;
        console.log("Line 97--Before customization:", structuredPrompt);
        

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

podcastEntryController.post('/audio', async (req, res) => {
    const { googleCloudTTS } = req.body
    
    try {
        console.log("BE-Line 131 TTS prompt: ",googleCloudTTS)


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

        console.log("Line 152 - Audio Conversion: ",response);
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
        console.log("GOOGLE_APPLICATION_CREDENTIALS:", process.env.GOOGLE_APPLICATION_CREDENTIALS);

        console.error("Error generating audio:", error);
        res.status(500).json({ error: "Failed to generate audio." });
    } 
});
podcastEntryController.post('/save', async (req,res)=>{

})

module.exports = podcastEntryController;