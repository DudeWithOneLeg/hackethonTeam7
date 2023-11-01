const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Payment } = require("../../db/models");
const { internalServerError, notFoundError } = require('../../utils/errorFunc');
const { isAdmin, authPayment, checkUser } = require('../../utils/authorization');

// Get all payments
router.get("/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const payments = await Payment.findAll()
        return res.json({ data: payments })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// get a payment by id
router.get("/id/:paymentId", restoreUser, requireAuth, authPayment, async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.paymentId)

        if (!payment) {
            return notFoundError(res, "Payment information")
        }

        return res.json({ data: payment })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// // get all payment a user has, needs to setup the payment table a bit more
// router.get('/user/:userId', restoreUser, requireAuth, checkUser, async (req, res) => {
//     try {
//         const payments = await Payment.findAll({
//             where: {
//                 userId: req.params.userId
//             },
//             attributes: { exclude: ["createdAt", "updatedAt"] }
//         })
//     } catch (err) {
//         return internalServerError(res, err)
//     }
// })

// create a new payment for a user


// delete a payment
router.delete("/id/:paymentId", restoreUser, requireAuth, authPayment, async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.paymentId)
        if (!payment) {
            return notFoundError(res, "Payment information")
        }
        await payment.destroy()
        res.status(200).json({ message: "Payment information successfully deleted", statusCode: 200 })
    } catch (err) {
        return internalServerError(res, err)
    }
})

module.exports = router
