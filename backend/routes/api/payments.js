const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Payment } = require("../../db/models")

// Get all orders made
router.get("/all", async (req, res) => {
    const payments = await Payment.findAll()
    res.json(payments)
})

module.exports = router
