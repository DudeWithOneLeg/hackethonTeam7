const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Order } = require("../../db/models");
const { internalServerError, notFoundError } = require('../../utils/errorFunc');
const { isAdmin, checkUser, forbidden } = require('../../utils/authorization');


// Get all orders made
router.get("/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const orders = await Order.findAll()
        res.json({ data: orders })
    } catch (error) {
        return internalServerError(res)
    }
})

// get all orders made by a user
router.get("/user/:userId", restoreUser, requireAuth, checkUser, async (req, res) => {
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
router.get("/date/:dateString", restoreUser, requireAuth, async (req, res, next) => {
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
        if (orders.userId === req.user.id || req.user.id === 1) {
            return res.json({ data: orders });
        }

        return res.status(403).json({ message: "You are not authorized to see this information." })
    } catch (error) {
        return internalServerError(res);
    }
});

module.exports = router
