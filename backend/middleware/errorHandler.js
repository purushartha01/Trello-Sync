const errorHandler = (err, req, res, next) => {
    const statusCode = res.locals.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error(err);
    res.status(statusCode).json({
        message: message
    });
}

module.exports = errorHandler;