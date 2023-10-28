const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, ShippingAddress } = require("../../db/models");
const { internalServerError, notFoundError } = require('../../utils/errorFunc');
const { isAdmin, checkUser, authShipping } = require('../../utils/authorization');


// Get all shipping addresses
router.get("/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const shippingAddresses = await ShippingAddress.findAll();
        res.json({ data: shippingAddresses });
    } catch (error) {
        return internalServerError(res);
    }
});


// get a shipping address by id
router.get("/id/:shippingAddressId", restoreUser, requireAuth, authShipping, async (req, res) => {
    try {
        const shippingAddress = await ShippingAddress.findByPk(req.params.shippingAddressId)
        if (!shippingAddress) {
            return notFoundError(res, "Shipping address")
        }
        res.json({ data: shippingAddress })
    } catch (error) {
        return internalServerError(res)
    }
})

// Get a shipping address of a user
router.get("/user/:userId", restoreUser, requireAuth, checkUser, async (req, res) => {
    try {
        const shippingAddress = await ShippingAddress.findAll({
            where: {
                userId: req.params.userId
            }
        });

        if (!shippingAddress.length) {
            return notFoundError(res, "Shipping address")
        }

        res.json({ data: shippingAddress });
    } catch (error) {
        return internalServerError(res);
    }
});


// Create a shipping address for a user
router.post("/user/:userId", restoreUser, requireAuth, checkUser, async (req, res) => {
    const { shippingAddress, shippingState, shippingZipCode } = req.body;

    try {
        const newShippingAddress = await ShippingAddress.create({
            userId: req.params.userId,
            shippingAddress: shippingAddress,
            shippingState: shippingState,
            shippingZipCode: shippingZipCode
        });

        res.status(201).json({ data: newShippingAddress });
    } catch (error) {
        return internalServerError(res);
    }
});


// Delete a shipping address for a user
router.delete("/address/:shippingAddressId", restoreUser, requireAuth, checkUser, async (req, res) => {
    try {
        const shippingAddress = await ShippingAddress.findByPk(req.params.shippingAddressId)
        if (!shippingAddress) {
            return notFoundError(res, "Shipping Address")
        }

        await shippingAddress.destroy()
        res.status(200).json({ message: "Shipping address successfully deleted", statusCode: 200 });
    } catch (error) {
        return internalServerError(res);
    }
});


module.exports = router
