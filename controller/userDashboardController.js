const express = require('express')
const userDashboard = express.Router()
const {AuthenticateToken} = require('../validations/logRequests')

userDashboard.use(express.json())
userDashboard.use


userDashboard.get('/', async (req,res)=> {

})


module.exports = userDashboard;
