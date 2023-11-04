import { csrfFetch } from "./csrf";

const LOAD_PRODUCTCART = "/product/setProductCart"
const LOAD_PRODUCTCARTS = "/product/setProductCarts"
const ADD_PRODUCTCART = "/product/addProductCart"
const EDIT_PRODUCTCART = "/product/editProductCart"
const DELETE_PRODUCTCART = "/product/deleteProductCart"
const CLEAR_PRODUCTCART = "/product/clearProductCart"

export const loadProductCart = (productCategory) => {
    return {
        type: LOAD_PRODUCTCART,
        payload: productCategory
    }
}

export const loadProductCarts = (productCart) => {
    return {
        type: LOAD_PRODUCTCARTS,
        payload: productCart,
    }
}

// thunk action for all product carts
export const loadAllProductCartsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/productcart/all")
        if (res.ok) {
            const allPCs = await res.json()
            dispatch(loadProductCarts(allPCs))
        } else {
            console.error('Failed to load all productCart:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading all productCart:', err);
    }
    return []
}

// thunk action for current user
export const loadUserProductCartThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/productcart/current`)
        if (res.ok) {
            const productCart = await res.json()
            dispatch(loadProductCarts(productCart))
        } else {
            console.error(`Failed to load productCart of category {categoryId}:`, res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading productCart of category {categoryId}:', err);
    }
}

export const addProductCart = (productCategory) => {
    return {
        type: ADD_PRODUCTCART,
        payload: productCategory
    }
}

// thunk action to create a new product category based on product Id and a list of categories
export const addProductCartThunk = (productId, quantity) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/productcart/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId, quantity })
        })

        if (res.ok) {
            const productCategory = await res.json()
            dispatch(addProductCart(productCategory))
            return productCategory
        } else {
            console.error(`Failed to create a new productCatgory for product ${productId}:`, res.status, res.statusText);
        }

    } catch (err) {
        console.error('An error occurred while creating new productCategory:', err);
    }
}


export const editProductCart = (productCategory) => {
    return {
        type: EDIT_PRODUCTCART,
        payload: productCategory
    }
}


// thunk action to edit productCart
export const editProductCartThunk = (productId, newCategories) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/productcart/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categories: newCategories }),
        });

        if (res.ok) {
            const newProductCart = await res.json()
            dispatch(editProductCart(newProductCart))
            return newProductCart
        } else {
            console.error(`Failed to edit productCart of product ${productId}:`, res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while editing new productCategory:', err);
    }
}


export const deleteProductCart = (productCategory) => {
    return {
        type: DELETE_PRODUCTCART,
        payload: productCategory
    }
}

// delete product category thunk
export const deleteProductCartThunk = (productCategoryId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/productcart/${productCategoryId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            const productCategory = await res.json()
            dispatch(deleteProductCart(productCategory))
        } else {
            console.error(`Failed to delete productCategory ${productCategoryId}:`, res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occurred while deleting productCategory ${productCategoryId}:`, err);
    }
}

export const clearProductCart = () => {
    return {
        type: CLEAR_PRODUCTCART
    }
}


const initialProduct = {}

const productCartReducer = (state = initialProduct, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_PRODUCTCART:
            return action.payload.data
        case LOAD_PRODUCTCARTS:
            const productCart = {}

            if (!action.payload.data) {
                return productCart
            }

            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                productCart[curr.id] = curr
            }

            return productCart
        case ADD_PRODUCTCART:
            newState[action.payload.id] = action.payload.data
            return newState;
        case EDIT_PRODUCTCART:
            newState[action.payload.id] = action.payload.data;
            return newState;
        case DELETE_PRODUCTCART:
            delete newState[action.payload.id]
            return newState;
        case CLEAR_PRODUCTCART:
            return initialProduct
        default:
            return newState;
    }
}

export default productCartReducer
