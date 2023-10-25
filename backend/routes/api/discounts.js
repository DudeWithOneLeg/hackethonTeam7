const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Discount } = require("../../db/models");
const { internalServerError } = require('../../utils/internalServerError');
const { notFoundError } = require('../../utils/notFoundError');

// Get all discounts
router.get("/all", async (req, res) => {
    try {
        const discounts = await Discount.findAll()
        res.json({ data: discounts })
    } catch (error) {
        return internalServerError(res)
    }
})

// get a discount by id
router.get("/:discountId", async (req, res, next) => {
    try {
        const discount = await Discount.findByPk(req.params.discountId)
        if (!discount) {
            return notFoundError(res, "Discount")
        }

        res.json({ data: discount })
    } catch (error) {
        return internalServerError(res)
    }
})

// Create a new discount
router.post("/new", async (req, res) => {
    try {
        const { codeName, applicableCategory, discountType, discountValue, expirationDate } = req.body

        const newDiscount = await Discount.create({
            codeName: codeName,
            applicableCategory: applicableCategory,
            discountType: discountType,
            discountValue: discountValue,
            expirationDate: expirationDate
        })

        res.status(201).json({ data: newDiscount })
    } catch (error) {
        return internalServerError(res)
    }
})

router.delete('/:discountId', async (req, res) => {
    try {
        const discount = await Discount.findByPk(req.params.discountId)
        if (!discount) {
            return notFoundError(res, "Discount")
        }

        await discount.destroy()
        res.status(200).json({ message: "Discount successfully deleted", statusCode: 200 })
    } catch (error) {
        return internalServerError(res)
    }
})

module.exports = router
