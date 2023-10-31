const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Category, ProductCategory } = require("../../db/models");
const { internalServerError, notFoundError } = require('../../utils/errorFunc');
const { isAdmin } = require('../../utils/authorization');


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
router.post("/new", restoreUser, requireAuth, isAdmin, async (req, res) => {
    const { productId } = req.body
    let categories = "All"
    if (req.query.categories) {
        categories = req.query.categories
    }
    const categoryNames = categories.split(',')

    let newPCs = []

    try {
        for (let i = 0; i < categoryNames.length; i++) {
            let curr = categoryNames[i]
            const categoryId = await Category.findOne({
                where: {
                    categoryName: curr
                },
                attributes: ["id"]
            })

            const newProductCategory = await ProductCategory.create({
                productId: productId,
                categoryId: categoryId.id
            })


            newPCs.push(newProductCategory)
        }

        res.status(201).json({ data: newPCs })
    } catch (error) {
        return internalServerError(res)
    }
})

// delete a productCategory
router.delete("/delete/:productCategoryId", restoreUser, requireAuth, isAdmin, async (req, res) => {
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
