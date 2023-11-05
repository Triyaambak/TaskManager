const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleWare = (err, req, res, next) => {
    const customError = {
        statusCode : err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message : err.message || 'Something went wrong , Please try again later',
    }
    return res.status(customError.statusCode).send(customError.message);
};

module.exports = errorHandlerMiddleWare;