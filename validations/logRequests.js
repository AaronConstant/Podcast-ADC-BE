const logIncomingRequest = (request, response, next) => {
    console.log('Incoming request:', request.method, request.originalUrl);
    console.log('Request Body:', request.body);
    next(); 
};

module.exports = logIncomingRequest;
