function unknownError(req, res, next) {
    const {message = "unknown error", status = 500} = error;
    res.status(status).json({error: message});
}

module.exports = unknownError;