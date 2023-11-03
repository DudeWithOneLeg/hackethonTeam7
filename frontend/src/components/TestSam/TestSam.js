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
        dispatch(loadAllDiscountsThunk())
        setLoad(true)
    }, [dispatch, refresh])

    return load ? (
        <div>
            test
        </div>
    ) : (
        <div></div>
    )
}

export default TestSam
