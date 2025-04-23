# Podcast-ADC Backend

Welcome to the **Podcast-ADC Backend**! This repository contains the server-side logic for the Podcast-ADC project, built with **Node.js** and **Express**. It integrates with **Gemini** and **ElevenLabs APIs** to provide advanced features like natural language processing and text-to-speech capabilities.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Integrations](#api-integrations)
- [License](#license)

## Project Overview

The Podcast-ADC Backend is the core server component that powers the Podcast-ADC project. It handles tasks such as:

- Processing requests from the front end.
- Integrating with third-party APIs like Gemini and ElevenLabs.
- Managing data flow between the front end and external services.

## Features

- **API Integration**:
  - **Gemini**: For natural language processing and advanced text analysis.
  - **Google Cloud TTS**: For high-quality text-to-speech conversion.
- **RESTful API**: Built with Express to handle HTTP requests and responses.
- **CORS Support**: Enabled for seamless communication between the frontend and backend.
- **Modular Codebase**: Organized and easy-to-extend architecture.

## Tech Stack

The backend is built using the following technologies:

### Core Technologies
- **Node.js**: The runtime environment for executing server-side JavaScript.
- **Express**: A fast and minimalist web framework for Node.js.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.

### API Integrations
- **Gemini API**: For natural language processing and text analysis.
- **ElevenLabs API**: For text-to-speech functionality.

### Development Tools
- **NPM**: For dependency management.
- **Postman**: For testing API endpoints.
- **Git**: For version control.

### Environment Management
- **dotenv**: For managing environment variables (e.g., API keys).

## API Integrations

### Gemini API
The backend integrates with the **Gemini API** to provide advanced natural language processing capabilities. This includes:
- Text analysis.
- Topic extraction.

### Google Cloud TTS
The backend uses the **Google Cloud TTS** for text-to-speech functionality. This allows you to:
- Convert text into high-quality audio.


## Installation

To set up the backend locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AaronConstant/Podcast-ADC.git
   cd Podcast-ADC/backend
