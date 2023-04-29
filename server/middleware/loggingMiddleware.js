// uses morgan library to log incoming and outgoing responses

const morgan = require('morgan');

const requestLogger = morgan('dev');

module.exports = {
    requestLogger,
};

