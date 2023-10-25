const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Product } = require("../../db/models")

// Get all products
router.get("/all", async (req, res) => {
    const products = await Product.findAll()
    res.json(products)
})


module.exports = router
