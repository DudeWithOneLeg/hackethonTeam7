const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Cart, Order, ProductCart } = require("../../db/models");
const { isAdmin } = require('../../utils/authorization');
const { notFoundError, notAuthToEdit, notAuthToDelete, internalServerError } = require('../../utils/errorFunc');


// get all the carts
router.get("/all", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const carts = await Cart.findAll()
        res.json({ data: carts })
    } catch (err) {
        return internalServerError(res, err)
    }
})

// get the cart for current user
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    try {
        const cart = await Cart.findAll({
            where: {
                userId: req.user.id
            }
        })

        if (!cart) {
            return notFoundError(res, "Cart")
        }

        res.json({ data: cart })
    } catch (err) {
        return internalServerError(res, err)
    }
})


// Get cart by cart Id
router.get("/:cartId", restoreUser, requireAuth, isAdmin, async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.cartId)
        res.json(cart)
    } catch (err) {
        return internalServerError(res, err)
    }
})


//create a new cart
router.post('/', restoreUser, requireAuth, async (req, res) => {
    try {
        const newCart = await Cart.create({
            userId: req.user.id,
        });

        res.json({ data: newCart })
    } catch (err) {
        return internalServerError(res, err)
    }
})



// clear current user's cart for when an order is placed, then create a new cart for user
// this route also functions as the POST for new Order
router.delete("/", restoreUser, requireAuth, async (req, res) => {
    try {
        const userCart = await Cart.findOne({
            where: {
                userId: req.user.id
            }
        })


        if (!userCart) {
            return notFoundError(res, "Cart")
        }

        const userProductCart = await ProductCart.findAll({
            where: {
                userId: req.user.id
            }
        })

        let totalAmount = 0
        for (let i = 0; i < userProductCart.length; i++) {
            totalAmount += userProductCart[i].quantity * userProductCart[i].pricePerUnit
        }

        const currentDate = new Date().toISOString().slice(0, 10);

        const newOrder = await Order.create({
            userId: req.user.id,
            orderDate: currentDate,
            status: "processing",
            totalAmount: totalAmount
        })

        await ProductCart.destroy({ where: { cartId: userCart.id } });

        res.json({ data: newOrder })
    } catch (err) {
        return internalServerError(res, err)
    }
})



module.exports = router
