const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const podcastEntryController = require('./controller/podcastEntryController.js');
const userController = require('./controller/usersController.js');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello Gemini!');
});

app.use('/users/:user_id/podcastentries', podcastEntryController);
app.use('/users', userController);


app.get("*", (req, res) => {
    res.status(404).json({error:'Path not Found'})
});

module.exports = app;