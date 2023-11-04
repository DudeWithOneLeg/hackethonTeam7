import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addDiscountThunk, deleteDiscount, deleteDiscountThunk, editDiscountThunk, loadAllDiscountsThunk } from "../../store/discount"
import { login } from "../../store/session"

function TestSam() {
    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false)
    const [load, setLoad] = useState(false)

    // creating a new discount address
    const [codeName, setCodeName] = useState("")

    useEffect(() => {
        setLoad(true)
    }, [dispatch, refresh])

    const demoSignIn = (e) => {
        e.preventDefault()

        const demoUser = {
            credential: "demo@aa.io",
            password: "password"
        }
        dispatch(login(demoUser))
    }

    console.log('booba', useSelector(state => state.session.user))
    return load ? (
        <div>
            <button onClick={demoSignIn}>Demo Sign In</button>
        </div>
    ) : (
        <div></div>
    )
}

export default TestSam
