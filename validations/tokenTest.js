require('dotenv').config()

const jwt = require('jsonwebtoken');

const payload = { id:'8ca0fd8D-fd03-438c-8200-c6c4e7ef4aa9' };

const secret = process.env.JWT_SECRET;

const token = jwt.sign(payload, secret, { expiresIn: '1h' });

console.log('Generated Token:', token);