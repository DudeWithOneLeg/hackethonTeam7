const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Discount } = require("../../db/models")

// Get all discounts
router.get("/all", async (req, res) => {
    const discounts = await Discount.findAll()
    res.json(discounts)
})

module.exports = router
