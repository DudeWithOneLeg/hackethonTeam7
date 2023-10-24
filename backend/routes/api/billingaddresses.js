const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, BillingAddress } = require("../../db/models")


// Get all billing addresses
router.get("/all", async (req, res) => {
    const BillingAddress = await BillingAddress.findAll()
    res.json({ BillingAddress })
})
