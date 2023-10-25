const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, ProductImage } = require("../../db/models")

// Get all productImage
router.get("/all", async (req, res) => {
    const productImage = await ProductImage.findAll()
    res.json(productImage)
})


module.exports = router
