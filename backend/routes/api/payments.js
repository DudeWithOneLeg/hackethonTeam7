const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Payment } = require("../../db/models");
const { internalServerError } = require('../../utils/internalServerError');

// Get all payments
router.get("/all", async (req, res) => {
    try {
        const payments = await Payment.findAll()
        res.json({ data: payments })
    } catch (error) {
        return internalServerError(res)
    }
})

module.exports = router
