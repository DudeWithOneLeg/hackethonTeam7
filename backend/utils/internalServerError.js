const internalServerError = (res) => {
    res.status(500).json({ error: "Internal server error" });
}

module.exports = { internalServerError }
