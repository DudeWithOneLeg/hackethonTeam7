import { csrfFetch } from "./csrf";

const ADD_STRIPE = "/stripe/addStripe"

export const addStripe = (stripe) => {
    return {
        type: ADD_STRIPE,
        payload: stripe
    }
}
