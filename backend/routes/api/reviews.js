const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Review, Product } = require("../../db/models");
const { internalServerError } = require('../../utils/internalServerError');
const { notFoundError } = require('../../utils/notFoundError');

// Get all reviews
router.get("/all", async (req, res) => {
    try {
        const reviews = await Review.findAll()
        res.json({ data: reviews })
    } catch (error) {
        return internalServerError(res)
    }
})

// Get a review by id
router.get("/:reviewId", async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.reviewId)
        if (!review) {
            return notFoundError(res, "Review")
        }
        res.json({ data: review })
    } catch (error) {
        return internalServerError(res)
    }
})

// get a user's review for a product
router.get("/product/:productId/user/:userId", async (req, res) => {
    try {
        const review = await Review.findAll({
            where: {
                userId: req.params.userId,
                productId: req.params.productId
            }
        })

        if (!review.length) {
            return notFoundError(res, "Review")
        }

        res.json({ data: review })
    } catch (error) {
        return internalServerError(res)
    }
})

// Get all reviews made to a particular product
router.get("/product/:productId", async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: {
                productId: req.params.productId
            }
        })

        res.json({ data: reviews })
    } catch (error) {
        return internalServerError(res)
    }
})


// Get all reviews made by a user
router.get('/user/:userId', async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: {
                userId: req.params.userId
            }
        })

        res.json({ data: reviews })
    } catch (error) {
        return internalServerError(res)
    }
})


// create new review for a product
router.post('/product/:productId', async (req, res) => {
    try {
        const { userId, review, rating } = req.body;

        // check if product exists
        const product = await Product.findByPk(req.params.productId)
        if (!product) {
            return notFoundError(res, "Product")
        }

        // check if user already has a review for a product
        const checkForReview = await Review.findAll({
            where: {
                productId: req.params.productId,
                userId: userId
            }
        })
        if (checkForReview.length > 0) {
            res.status(403).json({ message: "User already has a review for this product." })
        }

        // if there's no problem, create a new review for a product
        const newReview = await Review.create({
            userId: userId,
            productId: req.params.productId,
            review: review,
            rating: rating
        })

        res.json({ data: newReview })
    } catch (error) {
        return internalServerError(res)
    }
})


// delete a review for a product
router.delete("/:reviewId", async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.reviewId)
        if (!review) {
            return notFoundError(res, "Review")
        }

        await review.destroy()
        res.status(200).json({ message: "Review successfully deleted", statusCode: 200 })
    } catch (error) {
        return internalServerError(res)
    }
})


module.exports = router
