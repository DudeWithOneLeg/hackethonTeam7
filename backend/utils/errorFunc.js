const internalServerError = (res) => {
    res.status(500).json({ error: "Internal server error" });
}

const notFoundError = (res, el) => {
    res.status(404).json({ message: `${el} not found`, statusCode: 404 });
}

const nextError = (next, msg, status) => {
    const error = new Error(msg);
    error.status = status;
    return next(error);
};


module.exports = {
    internalServerError,
    notFoundError,
    nextError
}