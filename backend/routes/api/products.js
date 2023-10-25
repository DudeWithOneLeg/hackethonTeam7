const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Product, Category, ProductCategory } = require("../../db/models");
const { internalServerError } = require('../../utils/internalServerError');
const { notFoundError } = require('../../utils/notFoundError');

// Get all products
router.get("/all", async (req, res) => {
    try {
        const products = await Product.findAll()
        res.json({ data: products })
    } catch (error) {
        return internalServerError(res)
    }
})

// Get a product by id
router.get("/:productId", async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.productId)
        if (!product) {
            return notFoundError(res, "Product")
        }
        res.json({ data: product })
    } catch (error) {
        return internalServerError(res)
    }
})

// Get a product by category
// TO DO
router.get("/category", async (req, res) => {
    // const { categories } = req.query;
    // try {


    //     // Convert the categories string to an array of category names
    //     const categoryNames = categories.split(',');

    //     const products = await Product.findAll({
    //         include: [
    //             {
    //                 model: Category,
    //                 as: 'categories',
    //                 required: true,
    //                 where: {
    //                     categoryName: {
    //                         [Op.in]: categoryNames,
    //                     },
    //                 },
    //             },
    //         ],
    //     });

    //     res.json({ data: products });
    // } catch (error) {
    //     // Handle errors appropriately
    //     console.error(error);
    //     return res.status(500).json({ error: 'Internal server error' });
    // }
})


module.exports = router
