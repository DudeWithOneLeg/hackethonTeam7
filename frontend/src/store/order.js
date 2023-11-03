import { csrfFetch } from "./csrf";

const LOAD_ORDER = "/order/setOrder"
const LOAD_ORDERS = "/order/setOrders"
const ADD_ORDER = "/order/addOrder"
const EDIT_ORDER = "/order/editOrder"
const DELETE_ORDER = "/order/deleteOrder"
const CLEAR_ORDER = "/order/clearOrder"

export const loadOrder = (order) => {
    return {
        type: LOAD_ORDER,
        payload: order
    }
}

export const loadOrders = (orders) => {
    return {
        type: LOAD_ORDERS,
        payload: orders,
    }
}

export const addOrder = (order) => {
    return {
        type: ADD_ORDER,
        payload: order
    }
}

export const editOrder = (order) => {
    return {
        type: EDIT_ORDER,
        payload: order
    }
}

export const deleteOrder = (order) => {
    return {
        type: DELETE_ORDER,
        payload: order
    }
}

export const clearOrder = () => {
    return {
        type: CLEAR_ORDER
    }
}

// thunk action for one specific order
export const loadOneOrderThunk = (orderId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/order/id/${orderId}`)
        if (res.ok) {
            const order = await res.json()
            dispatch(loadOrder(order))
        } else {
            console.error('Failed to load specific order:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading specific order:', err);
    }
}

// thunk action for all orders
export const loadAllOrdersThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/order/all")
        if (res.ok) {
            const allOrders = await res.json()
            dispatch(loadOrders(allOrders))
        } else {
            console.error('Failed to load all orders:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading all orders:', err);
    }
    return []
}

// thunk action for one user's orders
export const loadUserOrdersThunk = (userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/order/user/${userId}`)
        if (res.ok) {
            const order = await res.json()
            dispatch(loadOrder(order))
        } else {
            console.error('Failed to load order:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading order:', err);
    }
}

// thunk action for creating a new order
export const addOrderThunk = (newOrder) => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/order/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newOrder)
        })

        if (res.ok) {
            const order = await res.json()
            dispatch(addOrder(order))
            return order
        } else {
            console.error('Failed to create a new order:', res.status, res.statusText);
        }

    } catch (err) {
        console.error('An error occurred while creating new order:', err);
    }
}

// thunk action for editing a order information
export const editOrderThunk = (orderId, orderInfo) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/order/${orderId}/info`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderInfo })
        })

        if (res.ok) {
            const updatedOrder = await res.json()
            dispatch(editOrder(updatedOrder))
            return updatedOrder
        } else {
            console.error('Failed to update order information:', res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occurred while updating order ${orderId} information:`, err)
    }
}

export const deleteOrderThunk = (orderId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/order/${orderId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            dispatch(deleteOrder(orderId))
        } else {
            console.error(`Failed to delete order ${orderId}:`, res.status, res.statusText)
        }
    } catch (err) {
        console.error(`An error occured while deleting order ${orderId}:`, err)
    }
}

const initialOrder = {}

const orderReducer = (state = initialOrder, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_ORDER:
            return action.payload
        case LOAD_ORDERS:
            const order = {}

            if (!action.payload.data) {
                return order
            }

            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                order[curr.id] = curr
            }

            return order
        case ADD_ORDER:
            newState[action.payload.id] = action.payload
            return newState;
        case EDIT_ORDER:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_ORDER:
            delete newState[action.payload.id]
            return newState;
        case CLEAR_ORDER:
            return initialOrder
        default:
            return newState;
    }
}

export default orderReducer;
