const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Order } = require("../../db/models");
const { internalServerError } = require('../../utils/internalServerError');
const { notFoundError } = require('../../utils/notFoundError');

// Get all orders made
router.get("/all", async (req, res) => {
    try {
        const orders = await Order.findAll()
        res.json({ data: orders })
    } catch (error) {
        return internalServerError(res)
    }
})

// get all orders made by a user
router.get("/user/:userId", async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                userId: req.params.userId
            }
        })

        if (!orders.length) {
            return notFoundError(res, "Orders")
        }

        res.json({ data: orders })
    } catch (error) {
        return internalServerError(res)
    }
})

// get all orders made on a particular date
router.get("/date/:dateString", async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                orderDate: req.params.dateString
            }
        });
        if (!orders.length) {
            return notFoundError(res, "Orders");
        }
        // Handle the case where orders are found
        res.json({ data: orders });
    } catch (error) {
        return internalServerError(res);
    }
});

module.exports = router
