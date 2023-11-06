const express = require('express')
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Product, Cart, ProductCartBackup } = require("../../db/models");
const { internalServerError, notFoundError, notAuthToView, notAuthToDelete, notAuthToEdit } = require('../../utils/errorFunc');
const { isAdmin } = require('../../utils/authorization');

// Get all productCartBackups
router.get("/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const productCartBackup = await ProductCartBackup.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })
        res.json({ data: productCartBackup })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// get all product cart items for current user
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    try {
        const productCartBackup = await ProductCartBackup.findAll({
            where: {
                userId: req.user.id
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        })

        return res.json({ data: productCartBackup })

    } catch (err) {
        return internalServerError(res, err)
    }
})


// get all items of a cart
router.get('/:cartId', restoreUser, requireAuth, async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.cartId)

        if (!cart) {
            return notFoundError(res, "Cart")
        }

        if (cart.userId !== req.user.id && req.user.id !== 1) {
            return notAuthToView(res, "cart")
        }

        const productCartBackup = await ProductCartBackup.findAll({
            where: {
                cartId: req.params.cartId
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        })

        res.json({ data: productCartBackup })

    } catch (err) {
        return internalServerError(res, err)
    }
})

// create a new product cart item
router.post("/", restoreUser, requireAuth, async (req, res) => {
    let { productId, quantity } = req.body


    try {
        const cart = await Cart.findOne({
            where: {
                userId: req.user.id
            }
        })

        const product = await Product.findByPk(productId)

        if (!cart) {
            return notFoundError(res, "Cart")
        }

        const newProductCartBackup = await ProductCartBackup.create({
            userId: req.user.id,
            cartId: cart.id,
            productId: productId,
            quantity: quantity,
            pricePerUnit: product.productPrice
        })

        res.status(201).json({ data: newProductCartBackup });
    } catch (err) {
        return internalServerError(res, err);
    }
})

module.exports = router
