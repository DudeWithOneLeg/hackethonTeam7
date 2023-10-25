const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, ShippingAddress } = require("../../db/models")

// Get all shipping addresses
router.get("/all", async (req, res) => {
    const shippingAddresses = await ShippingAddress.findAll()
    res.json(shippingAddresses)
})


module.exports = router
