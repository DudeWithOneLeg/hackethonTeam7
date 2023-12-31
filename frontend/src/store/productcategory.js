import { csrfFetch } from "./csrf";

const LOAD_PRODUCTCATEGORY = "/product/setProductCategory"
const LOAD_PRODUCTCATEGORIES = "/product/setProductCategories"
const ADD_PRODUCTCATEGORY = "/product/addProductCategory"
const EDIT_PRODUCTCATEGORY = "/product/editProductCategory"
const DELETE_PRODUCTCATEGORY = "/product/deleteProductCategory"
const CLEAR_PRODUCTCATEGORY = "/product/clearProductCategory"

export const loadProductCategory = (productCategory) => {
    return {
        type: LOAD_PRODUCTCATEGORY,
        payload: productCategory
    }
}

export const loadProductCategories = (productCategories) => {
    return {
        type: LOAD_PRODUCTCATEGORIES,
        payload: productCategories,
    }
}

// thunk action for all products
export const loadAllProductCategoriesThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/productcategory/all")
        if (res.ok) {
            const allPCs = await res.json()
            dispatch(loadProductCategories(allPCs))
        } else {
            console.error('Failed to load all productCategories:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading all productCategories:', err);
    }
    return []
}

// thunk action for all PCs of a category ID
export const loadProductCategoryByCategory = (categoryId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/productcategory/category/${categoryId}`)
        if (res.ok) {
            const productCategories = await res.json()
            dispatch(loadProductCategories(productCategories))
        } else {
            console.error(`Failed to load productCategories of category {categoryId}:`, res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading productCategories of category {categoryId}:', err);
    }
}

// thunk action for all PCs of a product ID
export const loadProductCategoryByProduct = (productId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/productcategory/product/${productId}`)
        if (res.ok) {
            const productCategories = await res.json()
            dispatch(loadProductCategories(productCategories))
        } else {
            console.error(`Failed to load productCategories of product ${productId}:`, res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading productCategories of product {categoryId}:', err);
    }
}

export const addProductCategory = (productCategory) => {
    return {
        type: ADD_PRODUCTCATEGORY,
        payload: productCategory
    }
}

// thunk action to create a new product category based on product Id and a list of categories
export const addProductCategoryThunk = (productId, categories) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/productcategory/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId, categories })
        })

        if (res.ok) {
            const productCategory = await res.json()
            dispatch(addProductCategory(productCategory))
            return productCategory
        } else {
            console.error(`Failed to create a new productCatgory for product ${productId}:`, res.status, res.statusText);
        }

    } catch (err) {
        console.error('An error occurred while creating new productCategory:', err);
    }
}


export const editProductCategory = (productCategory) => {
    return {
        type: EDIT_PRODUCTCATEGORY,
        payload: productCategory
    }
}


// thunk action to edit productCategories
export const editProductCategoryThunk = (productId, newCategories) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/productcategory/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categories: newCategories }),
        });

        if (res.ok) {
            const newProductCateogry = await res.json()
            dispatch(editProductCategory(newProductCateogry))
            return newProductCateogry
        } else {
            console.error(`Failed to edit productCategories of product ${productId}:`, res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while editing new productCategory:', err);
    }
}


export const deleteProductCategory = (productCategory) => {
    return {
        type: DELETE_PRODUCTCATEGORY,
        payload: productCategory
    }
}

// delete product category thunk
export const deleteProductCategoryThunk = (productCategoryId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/productcategory/${productCategoryId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            const productCategory = await res.json()
            dispatch(deleteProductCategory(productCategory))
        } else {
            console.error(`Failed to delete productCategory ${productCategoryId}:`, res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occurred while deleting productCategory ${productCategoryId}:`, err);
    }
}

export const clearProductCategory = () => {
    return {
        type: CLEAR_PRODUCTCATEGORY
    }
}


const initialProduct = {}

const productCategoryReducer = (state = initialProduct, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_PRODUCTCATEGORY:
            return action.payload.data
        case LOAD_PRODUCTCATEGORIES:
            const productCategories = {}

            if (!action.payload.data) {
                return productCategories
            }

            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                productCategories[curr.id] = curr
            }

            return productCategories
        case ADD_PRODUCTCATEGORY:
            newState[action.payload.id] = action.payload.data
            return newState;
        case EDIT_PRODUCTCATEGORY:
            newState[action.payload.id] = action.payload.data;
            return newState;
        case DELETE_PRODUCTCATEGORY:
            delete newState[action.payload.id]
            return newState;
        case CLEAR_PRODUCTCATEGORY:
            return initialProduct
        default:
            return newState;
    }
}

export default productCategoryReducer
