const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const geminiController = require('./controller/geminicontroller.js');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello Gemini!');
});

app.use('/geminiprompt', geminiController);


app.get("*", (req, res) => {
    res.status(404).json({error: "Path not found"})
});

module.exports = app;