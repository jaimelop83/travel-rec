// Desc: Entry point for the server
// handle .env file located in ./server/config/
require('dotenv').config({ path: './server/config/.env' });

// import routes
const routes = require('./routes/routes');

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// import middleware
const { corsMiddleware } = require('./middleware/corsMiddleware');
const { requestLogger } = require('./middleware/loggingMiddleware');
const { handleError } = require('./middleware/errorMiddleware');
const { verifyToken } = require('./middleware/authMiddleware');

// Middleware to parse JSON data from request body
app.use(express.json());

// Apply Middleware
app.use(corsMiddleware);
app.use(requestLogger);

// Routes
app.use(require(routes));

// Define simple route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Error handling middleware
app.use(handleError);

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

