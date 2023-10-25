const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, ProductCategory } = require("../../db/models")

// Get all productCategories
router.get("/all", async (req, res) => {
    const productCategory = await ProductCategory.findAll()
    res.json(productCategory)
})

// get all productCategories based on productId
router.get('/product/:productId', async (req, res) => {
    const productCategory = await ProductCategory.findAll({
        where: {
            productId: req.params.productId
        }
    })

    res.json(productCategory)
})

// get all productCategories based on categoryId
router.get('/category/:categoryId', async(req, res) => {
    const productCategory = await ProductCategory.findAll({
        where: {
            categoryId: req.params.categoryId
        }
    })

    res.json(productCategory)
})

module.exports = router
