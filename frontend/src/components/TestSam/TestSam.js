import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addShippingThunk, deleteShipping, deleteShippingThunk, editShippingThunk, loadAllShippingsThunk, loadOneShippingThunk, loadUserShippingsThunk } from "../../store/shippingaddress"
import { login } from "../../store/session"

function TestSam() {
    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false)
    const [load, setLoad] = useState(false)


    // creating a new shipping address
    const [shippingAddress, setShippingAddress] = useState("")
    const [shippingState, setShippingState] = useState("")
    const [shippingZipCode, setShippingZipCode] = useState("")

    useEffect(() => {
        dispatch(loadAllShippingsThunk())
        setLoad(true)
    }, [dispatch, refresh])

    const shipping = useSelector(state => state.shippingAddress)

    const getShipping = async (e) => {
        e.preventDefault()
        setRefresh(prevState => !prevState)
    }

    const handleCreateNew = (e) => {
        e.preventDefault()

        const newShipping = {
            shippingAddress,
            shippingState,
            shippingZipCode
        }

        dispatch(addShippingThunk(newShipping)).then(
            setRefresh(prevState => !prevState)
        )
    }

    const handleEdit = (e) => {
        e.preventDefault()

        const editShipping = {
            shippingAddress: shippingAddress,
            shippingState: shippingState,
            shippingZipCode: shippingZipCode
        }

        dispatch(editShippingThunk(1, editShipping)).then(
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

        dispatch(deleteShippingThunk(el.id)).then(
            setRefresh(prevState => !prevState)
        )

    }


    return load ? (
        <div>
            <section>
                <button onClick={(e) => handleSignIn(e)}>Sign in</button>
            </section>
            <section>
                <button onClick={(e) => getShipping(e)}>
                    <b>GET A SHIPPING ADDRESS</b>
                </button>
            </section>
            <section>
                {Object.values(shipping).map((el, i) => {
                    return (
                        <section onClick={(e) => handleDelete(e, el)}>
                            {el.shippingAddress}
                        </section>
                    )
                })}
            </section>
            <form onSubmit={handleCreateNew}>
                <input
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                />
                <input
                    type="text"
                    value={shippingState}
                    onChange={(e) => setShippingState(e.target.value)}
                />
                <input
                    type="text"
                    value={shippingZipCode}
                    onChange={(e) => setShippingZipCode(e.target.value)}
                />
                <button type="submit">create a new shipping</button>
            </form>
        </div>
    ) : (
        <div></div>
    )
}

export default TestSam
