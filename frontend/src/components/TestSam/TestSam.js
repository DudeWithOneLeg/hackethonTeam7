import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addBillingThunk, deleteBilling, deleteBillingThunk, editBillingThunk, loadAllBillingsThunk, loadOneBillingThunk, loadUserBillingsThunk } from "../../store/billingaddress"
import { login } from "../../store/session"

function TestSam() {
    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false)
    const [load, setLoad] = useState(false)


    // creating a new billing address
    const [billingAddress, setBillingAddress] = useState("")
    const [billingState, setBillingState] = useState("")
    const [billingZipCode, setBillingZipCode] = useState("")

    useEffect(() => {
        dispatch(loadAllBillingsThunk())
        setLoad(true)
    }, [dispatch, refresh])

    const billing = useSelector(state => state.billingAddress)

    const getBilling = async (e) => {
        e.preventDefault()
        setRefresh(prevState => !prevState)
    }

    const handleCreateNew = (e) => {
        e.preventDefault()

        const newBilling = {
            billingAddress,
            billingState,
            billingZipCode
        }

        dispatch(addBillingThunk(newBilling)).then(
            setRefresh(prevState => !prevState)
        )
    }

    const handleEdit = (e) => {
        e.preventDefault()

        const editBilling = {
            billingAddress: billingAddress,
            billingState: billingState,
            billingZipCode: billingZipCode
        }

        dispatch(editBillingThunk(1, editBilling)).then(
            setRefresh(prevState => !prevState)
        )
    }

    const handleSignIn = (e) => {
        e.preventDefault()

        const user = {
            credential: "admin@aa.io",
            password: "password"
        }

        dispatch(login(user))
    }

    const handleDelete = (e, el) => {
        e.preventDefault()

        dispatch(deleteBillingThunk(el.id)).then(
            setRefresh(prevState => !prevState)
        )

    }


    return load ? (
        <div>
            <section>
                <button onClick={(e) => handleSignIn(e)}>Sign in</button>
            </section>
            <section>
                <button onClick={(e) => getBilling(e)}>
                    <b>GET A BILLING ADDRESS</b>
                </button>
            </section>
            <section>
                {Object.values(billing).map((el, i) => {
                    return (
                        <section onClick={(e) => handleDelete(e, el)}>
                            {el.billingAddress}
                        </section>
                    )
                })}
            </section>
            <form onSubmit={handleCreateNew}>
                <input
                    type="text"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                />
                <input
                    type="text"
                    value={billingState}
                    onChange={(e) => setBillingState(e.target.value)}
                />
                <input
                    type="text"
                    value={billingZipCode}
                    onChange={(e) => setBillingZipCode(e.target.value)}
                />
                <button type="submit">create a new billing</button>
            </form>
        </div>
    ) : (
        <div></div>
    )
}

export default TestSam
