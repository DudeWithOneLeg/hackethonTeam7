const express = require('express');
const { environment } = require('../../config');
const { internalServerError } = require('../../utils/errorFunc');
const { User, Cart, Product, ProductCart } = require("../../db/models");
const { restoreUser, requireAuth } = require('../../utils/auth');
const router = express.Router();

let stripe
// set stripe key
if (environment === "development") {
    // if in development
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
} else if (environment === "production") {
    // if in production
    stripe = require('stripe')(process.env.STRIPE_PUBLIC_KEY)
}


// test route for processing stripe payment
router.post("/", restoreUser, requireAuth, async (req, res) => {
    try {
        const productCart = await ProductCart.findAll({
            where: {
                userId: req.user.id
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        })

        let url = environment === "development" ? "http://localhost:3000" : "INPUT LIVE URL"

        let cartItems = []

        for (let i = 0; i < productCart.length; i++) {
            let curr = productCart[i]
            let product = await Product.findByPk(curr.productId)

            cartItems.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.productName
                    },
                    unit_amount: curr.pricePerUnit,
                },
                quantity: curr.quantity,
            })
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: cartItems,
            mode: 'payment',
            success_url: `${url}/payment/success`,
            cancel_url: url
        })

        return res.json({ data: session })

    } catch (err) {
        return internalServerError(res, err)
    }
})


module.exports = router
