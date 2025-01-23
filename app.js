const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const geminiController = require('./controller/geminicontroller.js');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/gemini', geminiController);

app.get('/trasncript', (req, res) => {
    res.send('Welcome to transcript')
} )




module.exports = app;