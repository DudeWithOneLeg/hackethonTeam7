const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { BillingAddress } = require("../../db/models");
const { internalServerError, notFoundError } = require('../../utils/errorFunc');
const { isAdmin, authBilling, checkUser } = require('../../utils/authorization');


// Get all billing addresses
router.get("/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const billingAddresses = await BillingAddress.findAll();
        res.json({ data: billingAddresses });
    } catch (error) {
        return internalServerError(res);
    }
});


// get a billing address by id
router.get("/id/:billingAddressId", restoreUser, requireAuth, authBilling, async (req, res) => {
    try {
        const billingAddress = await BillingAddress.findByPk(req.params.billingAddressId)
        if (!billingAddress) {
            return notFoundError(res, "Billing address")
        }
        res.json({ data: billingAddress })
    } catch (error) {
        return internalServerError(res)
    }
})


// Get a billing address of a user
router.get("/user/:userId", restoreUser, requireAuth, checkUser, async (req, res) => {
    try {
        const billingAddress = await BillingAddress.findAll({
            where: {
                userId: req.params.userId
            }
        });

        if (!billingAddress.length) {
            return notFoundError(res, "Billing address")
        }

        res.json({ data: billingAddress });
    } catch (error) {
        return internalServerError(res);
    }
});


// Create a billing address for a user
router.post("/user/:userId", restoreUser, requireAuth, checkUser, async (req, res) => {
    const { billingAddress, billingState, billingZipCode } = req.body;

    try {
        const newBillingAddress = await BillingAddress.create({
            userId: req.params.userId,
            billingAddress: billingAddress,
            billingState: billingState,
            billingZipCode: billingZipCode
        });

        res.status(201).json({ data: newBillingAddress });
    } catch (error) {
        return internalServerError(res);
    }
});


// Delete a billing address for a user
router.delete("/address/:billingAddressId", restoreUser, requireAuth, checkUser, async (req, res) => {
    try {
        const billingAddress = await BillingAddress.findByPk(req.params.billingAddressId)
        if (!billingAddress) {
            return notFoundError(res, "Billing Address")
        }

        await billingAddress.destroy()
        res.status(200).json({ message: "Billing address successfully deleted", statusCode: 200 });
    } catch (error) {
        return internalServerError(res);
    }
});

module.exports = router
