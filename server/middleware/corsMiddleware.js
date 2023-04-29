// uses CORS library to allow cross-origin requests

const cors = require('cors');

// import .env file located in ./server/config/
require('dotenv').config({ path: './server/config/.env' });

// import PORTFRONTEND from .env file
const PORTFRONTEND = process.env.PORTFRONTEND;

const corsOptions = {
    origin: 'http://localhost:${PORTFRONTEND}', // this should be the frontend url
    optionSuccessStatus: 200,
};

const corsMiddleware = cors(corsOptions);

module.exports = {
    corsMiddleware,
};