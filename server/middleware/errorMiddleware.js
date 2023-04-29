// middleware to log the error stack trace and return JSON response containing the error message
// sets the status code to 500 (Internal Server Error) if no status code is provided

const handleError = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).send({ message: err.message });
}

module.exports = {
    handleError,
};
