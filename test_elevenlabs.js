const fetch = require('node-fetch');
const fs = require('fs');
const { exec } = require('child_process');
require('dotenv').config();
const Eleven_API = process.env.ELEVEN_API;

async function testElevenLabs() {
    try {
        const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'xi-api-key': Eleven_API, 
            },
            body: JSON.stringify({
                text: "Hello, this is a test.",
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

        const blob = await response.blob();

        const buffer = await blob.arrayBuffer();
        const audioBuffer = Buffer.from(buffer);

        const filePath = 'output.mp3'; 
        fs.writeFileSync(filePath, audioBuffer);

        console.log("Audio file saved to:", filePath);

        console.log("Playing audio...");
        exec(`ffplay -autoexit ${filePath}`, (error) => {
            if (error) {
                console.error("Error playing audio:", error);
            }
        });
    } catch (error) {
        console.error("Error generating audio:", error);
    }
}

testElevenLabs();