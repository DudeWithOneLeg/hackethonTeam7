const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Cart } = require("../../db/models")

// I think storing a user's cart in their cache would be better

// Get the cart for a particular user
router.get("/user/:userId", async (req, res) => {
    const cart = await Cart.findAll({
        where: {
            userId: req.params.userId
        }
    })
    res.json(cart)
})

module.exports = router
