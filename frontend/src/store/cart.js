import { csrfFetch } from "./csrf";

const LOAD_CART = "/cart/setCart"
const ADD_CART = "/cart/addCart"
const EDIT_CART = "/cart/editCart"
const DELETE_CART = "/cart/deleteCart"
const CLEAR_CART = "/cart/clearCart"

export const loadCart = (cart) => {
    return {
        type: LOAD_CART,
        payload: cart
    }
}

export const addCart = (cart) => {
    return {
        type: ADD_CART,
        payload: cart
    }
}

export const editCart = (cart) => {
    return {
        type: EDIT_CART,
        payload: cart
    }
}

export const deleteCart = (cart) => {
    return {
        type: DELETE_CART,
        payload: cart
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}

// thunk action for one specific cart
export const loadOneCartThunk = (cartId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/cart/id/${cartId}`)
        if (res.ok) {
            const cart = await res.json()
            dispatch(loadCart(cart))
        } else {
            console.error('Failed to load specific cart:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading specific cart:', err);
    }
}

// thunk action for all carts
export const loadAllCartsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/cart/all")
        if (res.ok) {
            const allCarts = await res.json()
            dispatch(loadCarts(allCarts))
        } else {
            console.error('Failed to load all carts:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading all carts:', err);
    }
    return []
}

// thunk action for one user's carts
export const loadUserCartsThunk = (userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/cart/user/${userId}`)
        if (res.ok) {
            const cart = await res.json()
            dispatch(loadCart(cart))
        } else {
            console.error('Failed to load cart:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading cart:', err);
    }
}

// thunk action for creating a new cart
export const addCartThunk = (newCart) => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/cart/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCart)
        })

        if (res.ok) {
            const cart = await res.json()
            dispatch(addCart(cart))
            return cart
        } else {
            console.error('Failed to create a new cart:', res.status, res.statusText);
        }

    } catch (err) {
        console.error('An error occurred while creating new cart:', err);
    }
}

// thunk action for editing a cart information
export const editCartThunk = (cartId, cartInfo) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/cart/${cartId}/info`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ cartInfo })
        })

        if (res.ok) {
            const updatedCart = await res.json()
            dispatch(editCart(updatedCart))
            return updatedCart
        } else {
            console.error('Failed to update cart information:', res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occurred while updating cart ${cartId} information:`, err)
    }
}

export const deleteCartThunk = (cartId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/cart/${cartId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            dispatch(deleteCart(cartId))
        } else {
            console.error(`Failed to delete cart ${cartId}:`, res.status, res.statusText)
        }
    } catch (err) {
        console.error(`An error occured while deleting cart ${cartId}:`, err)
    }
}

const initialCart = {}

const cartReducer = (state = initialCart, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_CART:
            return action.payload
        case ADD_CART:
            newState[action.payload.id] = action.payload
            return newState;
        case EDIT_CART:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_CART:
            delete newState[action.payload.id]
            return newState;
        case CLEAR_CART:
            return initialCart
        default:
            return newState;
    }
}

export default cartReducer;
