const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Product, Cart, ProductCart } = require("../../db/models");
const { internalServerError, notFoundError, notAuthToView, notAuthToDelete, notAuthToEdit } = require('../../utils/errorFunc');
const { isAdmin } = require('../../utils/authorization');
const { route } = require('./products');


// Get all productCarts
router.get("/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const productCart = await ProductCart.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"] }
        })
        res.json({ data: productCart })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// get all product cart items for current user
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    try {
        const productCart = await ProductCart.findAll({
            where: {
                userId: req.user.id
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        })

        res.json({ data: productCart })

        if (productCart.userId !== req.user.id && req.user.id !== 1) {
            return notAuthToView(res, "product cart")
        }


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

        const productCart = await ProductCart.findAll({
            where: {
                cartId: req.params.cartId
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        })

        res.json({ data: productCart })

    } catch (err) {
        return internalServerError(res, err)
    }
})

// create a new product cart item // will create a new product product between a product Id and for each product passed in
router.post("/", restoreUser, requireAuth, async (req, res) => {
    let { productId, quantity, pricePerUnit } = req.body

    try {
        const cart = await Cart.findOne({
            where: {
                userId: req.user.id
            }
        })

        if (!cart) {
            return notFoundError(res, "Cart")
        }

        if (cart.userId !== req.user.id && req.user.id !== 1) {
            return notAuthToView(res, "cart")
        }

        const newProductCart = await ProductCart.create({
            cartId: cart.id,
            productId: productId,
            quantity: quantity,
            pricePerUnit: pricePerUnit
        })

        res.status(201).json({ data: newProductCart });
    } catch (err) {
        return internalServerError(res, err);
    }
})


// edit a product cart. Only if the user owns that product cart row or the user is the Admin
router.put('/:productCartId', restoreUser, requireAuth, async (req, res) => {
    const { quantity } = req.body

    try {
        // Find the ProductCart by its id
        const productCart = await ProductCart.findByPk(req.params.productCartId);

        if (!productCart) {
            return notFoundError(res, "Product Cart")
        }

        if (req.user.id !== productCart.userId && req.user.id !== 1) {
            return notAuthToEdit(res, "product cart")
        }

        productCart.quantity = quantity;
        await productCart.save();

        res.status(201).json({ data: productCart })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// delete a productCart
router.delete("/:productCartId", restoreUser, requireAuth, async (req, res) => {
    try {
        const productCart = await ProductCart.findByPk(req.params.productCartId)

        if (!productCart) {
            return notFoundError(res, "Product Cart")
        }

        if (productCart.cartId !== req.user.id && req.user.id !== 1) {
            return notAuthToDelete(res, "product cart")
        }

        await productCart.destroy()
        res.status(200).json({ message: "Product Cart successfully deleted", statusCode: 200 })
    } catch (err) {
        return internalServerError(res, err)
    }
})

module.exports = router
