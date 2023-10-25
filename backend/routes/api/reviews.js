const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Review } = require("../../db/models")

// Get all reviews
router.get("/all", async (req, res) => {
    const reviews = await Review.findAll()
    res.json(reviews)
})


// Get all reviews made to a particular product
router.get("/product/:productId", async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            productId: req.params.productId
        }
    })

    res.json(reviews)
})


// Get all reviews made by a user
router.get('/user/:userId', async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.params.userId
        }
    })

    res.json(reviews)
})


module.exports = router
