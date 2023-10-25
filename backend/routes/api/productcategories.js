const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, ProductCategory } = require("../../db/models");
const { internalServerError } = require('../../utils/internalServerError');
const { notFoundError } = require('../../utils/notFoundError');

// Get all productCategories
router.get("/all", async (req, res) => {
    try {
        const productCategory = await ProductCategory.findAll()
        res.json({ data: productCategory })
    } catch (error) {
        return internalServerError(res)
    }
})

// get all productCategories based on productId
router.get('/product/:productId', async (req, res) => {
    try {
        const productCategory = await ProductCategory.findAll({
            where: {
                productId: req.params.productId
            }
        })

        res.json({ data: productCategory })

    } catch (error) {
        return internalServerError(res)
    }
})

// get all productCategories based on categoryId
router.get('/category/:categoryId', async (req, res) => {
    try {
        const productCategory = await ProductCategory.findAll({
            where: {
                categoryId: req.params.categoryId
            }
        })

        res.json({ data: productCategory })

    } catch (error) {
        return internalServerError(res)
    }
})

// create a new productCategory
router.post("/new", async (req, res) => {
    const { productId, categoryId } = req.body

    try {
        const newProductCategory = await ProductCategory.create({
            productId: productId,
            categoryId: categoryId
        })

        res.status(201).json({ data: newProductCategory })
    } catch (error) {
        return internalServerError(res)
    }
})

// delete a producCategory
router.delete("/delete/:productCategoryId", async (req, res) => {
    try {
        const productCategory = await ProductCategory.findByPk(req.params.productCategoryId)
        if (!productCategory) {
            return notFoundError(res, "Product Category")
        }

        await productCategory.destroy()
        res.status(200).json({ message: "Product Category successfully deleted", statusCode: 200 })
    } catch (error) {
        return internalServerError(res)
    }
})

module.exports = router
