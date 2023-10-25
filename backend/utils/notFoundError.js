const notFoundError = (res, el) => {
    res.status(404).json({ message: `${el} not found`, statusCode: 404 });
}

module.exports = { notFoundError }
