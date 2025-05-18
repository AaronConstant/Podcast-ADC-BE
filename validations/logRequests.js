require('dotenv').config()
const jwt = require('jsonwebtoken')

const logIncomingRequest = (request, response, next) => {
    console.log('Incoming request:', request.method, request.originalUrl);
    console.log('Request Body:', request.body);
    next(); 
};


const AuthenticateToken = (req,res,next) => {
    const authHeader = req.headers['Authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.sendStatus(401)

    jwt.verify(token,process.env.JWT_SECRET, (err,user)=> {
        if(err) return res.sendStatus(403)
        req.user = user 
    next()
    })
}

module.exports = {logIncomingRequest, AuthenticateToken};
