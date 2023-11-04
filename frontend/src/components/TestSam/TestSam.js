import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import { addDiscountThunk, deleteDiscount, deleteDiscountThunk, editDiscountThunk, loadAllDiscountsThunk } from "../../store/discount"
import { clearUser, login } from "../../store/session"
import { loadAllProductCategoriesThunk } from "../../store/productcategory"
import { clearProductCart, loadAllProductCartsThunk, loadUserProductCartThunk } from "../../store/productcart"
import { csrfFetch } from "../../store/csrf";

function TestSam() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [refresh, setRefresh] = useState(false)
    const [load, setLoad] = useState(false)

    // creating a new discount address
    const [codeName, setCodeName] = useState("")

    useEffect(() => {
        dispatch(loadUserProductCartThunk())

        dispatch(clearUser())
        dispatch(clearProductCart())
        setLoad(true)
    }, [dispatch, refresh])

    const productCart = useSelector(state => state.productCart)

    const demoSignIn = (e) => {
        e.preventDefault()

        const demoUser = {
            credential: "demo@aa.io",
            password: "password"
        }
        dispatch(login(demoUser))
    }

    const adminSignIn = (e) => {
        e.preventDefault()

        const adminUser = {
            credential: "admin@aa.io",
            password: "password"
        }
        dispatch(login(adminUser))
    }


    const checkout = async (e) => {
        e.preventDefault();

        const res = await csrfFetch("/api/stripe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (res.ok) {
            const response = await res.json()
            window.open(response.data.url)
        } else {
            history.push('/')
        }
    }

    return load ? (
        <div>
            <section>
                <button onClick={adminSignIn}>Admin Sign In</button>
                <button onClick={demoSignIn}>Demo Sign In</button>
            </section>
            <section>
                {Object.values(productCart).map(el => (
                    <div key={el.productId}>
                        <p>Product ID: {el.productId}</p>
                        <p>Price per Unit: {el.pricePerUnit}</p>
                        <p>Quantity: {el.quantity}</p>
                    </div>
                ))}
            </section>
            <button onClick={checkout}>Checkout</button>
        </div>
    ) : (
        <div></div>
    );
}

export default TestSam
