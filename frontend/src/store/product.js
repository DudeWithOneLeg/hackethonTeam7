import { csrfFetch } from "./csrf";

const LOAD_PRODUCT = "/product/setProduct"
const LOAD_PRODUCTS = "/product/setProducts"
const ADD_PRODUCT = "/product/addProduct"
const EDIT_PRODUCT = "/product/editProduct"
const DELETE_PRODUCT = "/product/deleteProduct"
const CLEAR_PRODUCT = "/product/clearProduct"

export const loadProduct = (product) => {
    return {
        type: LOAD_PRODUCT,
        payload: product
    }
}

export const loadProducts = (products) => {
    return {
        type: LOAD_PRODUCTS,
        payload: products,
    }
}


// thunk action for one specific product
export const loadOneProductThunk = (productName) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/product/${productName}`)
        if (res.ok) {
            const product = await res.json()
            dispatch(loadProduct(product))
        } else {
            console.error('Failed to load specific product:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading specific product:', err);
    }
}

// thunk action for all products
export const loadAllProductsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/product/all")
        if (res.ok) {
            const allProducts = await res.json()
            dispatch(loadProducts(allProducts))
        } else {
            console.error('Failed to load all products:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading all products:', err);
    }
    return []
}

// thunk action for products depending on filter and categories
export const loadFilteredProductsThunk = (categories, type) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/product/filter?categories=${categories}&type=${type}`)
        if (res.ok) {
            const filteredProducts = await res.json()
            dispatch(loadProducts(filteredProducts))
        } else {
            console.error('Failed to load filtered products:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading filtered products:', err);
    }
}


export const addProduct = (product) => {
    return {
        type: ADD_PRODUCT,
        payload: product
    }
}

// thunk action for creating a new product
export const addProductThunk = (newProduct) => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct)
        })

        if (res.ok) {
            const product = await res.json()
            dispatch(addProduct(product))
            return product
        } else {
            console.error('Failed to create a new product:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while creating new product:', err);
    }
}


export const editProduct = (product) => {
    return {
        type: EDIT_PRODUCT,
        payload: product
    }
}


// thunk action for editing a product information
export const editProductThunk = (productId, productInfo) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/product/${productId}/info`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productInfo })
        })

        if (res.ok) {
            const updatedProduct = await res.json()
            dispatch(editProduct(updatedProduct))
            return updatedProduct
        } else {
            console.error('Failed to update product information:', res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occurred while updating product ${productId} information:`, err)
    }
}


// thunk action for updating product quantity
export const editProductQuantityThunk = (productId, quantity) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/product/${productId}/quantity`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity })
        })

        if (res.ok) {
            const updatedProduct = await res.json()
            dispatch(editProduct(updatedProduct))
            return updatedProduct
        } else {
            console.error('Failed to update product quantity:', res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while calculating product's new category:", err)
    }
}


export const deleteProduct = (product) => {
    return {
        type: DELETE_PRODUCT,
        payload: product
    }
}

export const deleteProductThunk = (productId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/${productId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            dispatch(deleteProduct(productId))
        } else {
            console.error(`Failed to delete product ${productId}:`, res.status, res.statusText)
        }
    } catch (err) {
        console.error(`An error occured while deleting product ${productId}:`, err)
    }
}

export const clearProduct = () => {
    return {
        type: CLEAR_PRODUCT
    }
}



const initialProduct = {}

const productReducer = (state = initialProduct, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_PRODUCT:
            return action.payload.data
        case LOAD_PRODUCTS:
            const product = {}

            if (!action.payload.data) {
                return product
            }

            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                product[curr.id] = curr
            }
            newState.all = product
            return newState
        case ADD_PRODUCT:
            newState[action.payload.id] = action.payload
            return newState;
        case EDIT_PRODUCT:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_PRODUCT:
            delete newState[action.payload.id]
            return newState;
        case CLEAR_PRODUCT:
            return initialProduct
        default:
            return newState;
    }
}

export default productReducer
