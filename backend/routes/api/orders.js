const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Order } = require("../../db/models")

// Get all orders made
router.get("/all", async (req, res) => {
    const orders = await Order.findAll()
    res.json(orders)
})

module.exports = router
