const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const logInRequest =  require('./validations/logRequests.js');
const loginController = require('./controller/loginController.js')

const podcastEntryController = require('./controller/podcastEntryController.js');
const userController = require('./controller/usersController.js');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello Gemini!');
});
app.use('/signin', loginController)
app.use('/users/:user_id/podcastentries', podcastEntryController);
app.use('/users',logInRequest, userController);
// create an additional route for the dashboard after authentication and ensuring that only user information is persisting throughout the session. 

app.get("*", (req, res) => {
    res.status(404).json({error:'Path not Found'})
});

module.exports = app;