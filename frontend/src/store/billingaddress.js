import { csrfFetch } from "./csrf";

const LOAD_BILLING = "/product/setBilling"
const LOAD_BILLINGS = "/product/setBillings"
const ADD_BILLING = "/product/addBilling"
const EDIT_BILLING = "/product/editBilling"
const DELETE_BILLING = "/product/deleteBilling"
const CLEAR_BILLING = "/product/clearBilling"

export const loadBilling = (billingAddress) => {
    return {
        type: LOAD_BILLING,
        payload: billingAddress
    }
}

export const loadBillings = (billingAddresses) => {
    return {
        type: LOAD_BILLINGS,
        payload: billingAddresses
    }
}


//thunk action to get a billing address by id
export const loadOneBillingThunk = (billingId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/billing/${billingId}`)
        if (res.ok) {
            const billingAddress = await res.json()
            dispatch(loadBilling(billingAddress))
        } else {
            console.error('Failed to load specific billing address:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while loading specific billing address:', err);
    }
}

// thunk action to get all billing addresses for a user
export const loadUserBillingsThunk = (userId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/billing/user/${userId}`)
        if (res.ok) {
            const billingAddresses = await res.json()
            dispatch(loadBillings(billingAddresses))
        } else {
            console.error("Failed to load user's billing addresses:", res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while loading user's billing addresses:", err);
    }
}

export const loadAllBillingsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/billing/all`)
        if (res.ok) {
            const billingAddress = await res.json()
            dispatch(loadBillings(billingAddress))
        } else {
            console.error("Failed to load all billing addresses:", res.status, res.statusText);
        }
    } catch (err) {
        console.error("An error occurred while loading all billing addresses:", err);
    }
}

export const addBilling = (billingAddress) => {
    return {
        type: ADD_BILLING,
        payload: billingAddress
    }
}

export const addBillingThunk = (newBilling) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/billing/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBilling)
        })

        if (res.ok) {
            const billing = await res.json()
            dispatch(addBilling(billing))
        } else {
            console.error('Failed to create a new billing address:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while creating new billing address:', err);
    }
}

export const editBilling = (billingAddress) => {
    return {
        type: EDIT_BILLING,
        payload: billingAddress
    }
}

export const editBillingThunk = (billingId, editBilling) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/billing/${billingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editBilling)
        })

        if (res.ok) {
            const billing = await res.json()
            dispatch(editBilling(billing))
        } else {
            console.error('Failed to edit billing address:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('An error occurred while editing billing address:', err);
    }
}

export const deleteBilling = (billingAddress) => {
    return {
        type: DELETE_BILLING,
        payload: billingAddress
    }
}

export const deleteBillingThunk = (billingId) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/billing/${billingId}`, {
            method: "DELETE"
        })

        if (res.ok) {
            dispatch(deleteBilling(billingId))
        } else {
            console.error('Failed to delete billing address:', res.status, res.statusText);
        }
    } catch (err) {
        console.error(`An error occured while deleting billing address:`, err)
    }
}

export const clearBilling = () => {
    return {
        type: CLEAR_BILLING
    }
}


const initialBilling = {}

const billingReducer = (state = initialBilling, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_BILLING:
            return action.payload.data
        case LOAD_BILLINGS:
            const billingAddresses = {}

            if (!action.payload.data) {
                return billingAddresses
            }

            for (let i = 0; i < action.payload.data.length; i++) {
                let curr = action.payload.data[i]
                billingAddresses[curr.id] = curr
            }

            return billingAddresses
        case ADD_BILLING:
            newState[action.payload.id] = action.payload
            return newState;
        case EDIT_BILLING:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_BILLING:
            delete newState[action.payload.id]
            return newState;
        case CLEAR_BILLING:
            return initialBilling
        default:
            return newState
    }
}

export default billingReducer
