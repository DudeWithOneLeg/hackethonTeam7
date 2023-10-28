const express = require('express')
const router = express.Router();

const { check } = require('express-validator');

const { Op, Sequelize } = require('sequelize');
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
router.get("/id/:productId", async (req, res) => {
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

// Get a product by category and by filter type
    //'or' will, if given multiple categories, return all products of ANY of the categories
    //'and' will, if given multiple categories, return all products of ALL of the categories
    //'none' will, if given multiple categories, return all products of NON of the categories
// example url for testing: http://localhost:8000/api/product/filter?categories=Black,Indoor&type=or
router.get("/filter", async (req, res) => {
    try {
        // set default categories to "All" if none are passed in
        let categories = "All"
        if (req.query.categories) {
            categories = req.query.categories
        }

        // set default type filter to "or" if none are passed in
        let type = "or"
        if (req.query.type) {
            type = req.query.type
        }
        const categoryNames = categories.split(','); // Split the category names by commas

        // filter for "or"
        if (type === "or") {
            const products = await Product.findAll({
                include: [
                    {
                        model: Category,
                        required: true,
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        where: {
                            categoryName: {
                                [Op.or]: categoryNames
                            }
                        },
                        through: { attributes: [] } // Removes ProductCategory as it is redundant information
                    }
                ],
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            });

            res.json({ data: products });

        // filter for "none"
        } else if (type === "none") {
            // return res.json(products)
            const productIds = await Product.findAll({
                attributes: ['id'],
                include: {
                    model: Category,
                    where: {
                        categoryName: categoryNames,
                    },
                    attributes: [],
                    through: { attributes: [] },
                },
                raw: true,
            });

            const excludedProductIds = productIds.map((product) => product.id);

            const products = await Product.findAll({
                where: {
                    id: {
                        [Op.notIn]: excludedProductIds,
                    },
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: {
                    model: Category,
                    through: { attributes: [] }, // Removes ProductCategory as it is redundant information
                },
            });
            res.json({ data: products })

        // return for "and"
        } else if (type === "and") {
            // create an array that will have the categoryId number for each category condition passed in as a query
            const categoryQuery = await Category.findAll({
                where: {
                    categoryName: categoryNames,
                },
                attributes: ['id']
            });
            const categoryId = categoryQuery.map(category => category.id)

            // create an array of all product ids
            const products = await Product.findAll()

            const andProducts = [];

            // go through all the products
            for (const product of products) {
                //get all the product categories of the current product
                const currPC = await ProductCategory.findAll({
                    where: {
                        productId: product.id,
                    },
                    attributes: { exclude: ["createdAt", "updatedAt"] },
                });

                // get only the category id's of all the PC of the current product
                const categoryIds = currPC.map((pc) => pc.categoryId);

                // if every id of the conditions passed in as query is in the categoryIds array
                    // push the current product into the return "andProducts" array
                const result = categoryId.every((el) => categoryIds.includes(el));
                if (result) {
                    andProducts.push(product)
                }
            }

            return res.json(andProducts);
        }

    } catch (error) {
        return internalServerError(res);
    }
})

// figure out getting all products of "none"
router.get("/test", async (req, res) => {
    let categories = "All"
    if (req.query.categories) {
        categories = req.query.categories
    }
    let categoriesArr = categories.split(",")

    // Find PK of the categories
    let categoryId = []
    for (let i = 0; i < categoriesArr.length; i++) {
        let curr = categoriesArr[i]
        let category = await Category.findAll({
            where: {
                categoryName: curr
            },
            attributes: ["id"]
        })
        categoryId.push(category[0].id)
    }

    let productId = {}
    // Go through the categoryId array and find each entry in the ProductCategories that has that "categoryId"
    for (let i = 0; i < categoryId.length; i++) {
        let curr = categoryId[i]
        let productCategoryId = await ProductCategory.findAll({
            where: {
                categoryId: curr
            },
            attributes: ["productId"]
        })

        // loop through all the entries from the ProductCategory table and insert into the productId object the primary key of that product
        for (let j = 0; j < productCategoryId.length; j++) {
            let curr = productCategoryId[j]
            if (!productId[curr.productId]) {
                productId[curr.productId] = true
            }
        }
    }
    // convert the object to an array of the keys
    // at this point, this array will contain all the ids of products that has been categorized by one of the conditions passed in as a query
    productId = Object.keys(productId)

    // get all the products that are NOT in the productId array
    // basically getting all of the products that doesn't have a category of one of the conditions passed in as a query
    let products = await Product.findAll({
        where: {
            id: {
                [Op.notIn]: productId,
            },
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: {
            model: Category,
            through: { attributes: [] } // Removes ProductCategory as it is redundant information
        },
    });

    return res.json(products)
    try {

    } catch {
        return internalServerError(res);
    }
})

// // Get a product by category by "except". If given multiple categories, it will return all products not of any of the categories
// // example url: localhost:8000/api/product/category?or=Indoor,Black
// router.get("/except", async (req, res) => {
//     try {
//         const { categories } = req.query
//         const conditions = categories.split(','); // Split the category names by commas
//         const products = await Product.findAll({
//             include: [
//                 {
//                     model: Category,
//                     required: true,
//                     attributes: { exclude: ['createdAt', 'updatedAt'] },
//                     through: { attributes: [] }, // Exclude the ProductCategory as it is redundant information
//                 }
//             ],
//             attributes: { exclude: ['createdAt', 'updatedAt'] },
//             where: {
//                 [Op.and]: {
//                     '$Categories.categoryName$': {
//                         [Op.not]: conditions // Use Op.not to exclude products that match any of the conditions
//                     }
//                 }
//             },
//         });

//         res.json({ data: products });
//     } catch (error) {
//         return internalServerError(res);
//     }
// })

// // Get a product by category by "and". If given multiple categories, it will return all products part of every given category
// // example url: localhost:8000/api/product/category?and=Indoor,Black
// router.get("/and", async (req, res) => {
//     try {
//         const { categories } = req.query
//         const categoryNames = categories.split(','); // Split the category names by commas

//         console.log('booba', categoryNames)

//         const products = await Product.findAll({
//             include: [
//                 {
//                     model: Category,
//                     required: true,
//                     attributes: { exclude: ['createdAt', 'updatedAt'] },
//                     where: {
//                         [Op.and]: categoryNames.map(name => ({
//                             categoryName: name
//                         }))
//                     },
//                     through: { attributes: [] } // Removes ProductCategory as it is redundant information
//                 }
//             ],
//             attributes: { exclude: ['createdAt', 'updatedAt'] },
//         });

//         res.json({ data: products });
//     } catch (error) {
//         return internalServerError(res);
//     }
// })



module.exports = router
