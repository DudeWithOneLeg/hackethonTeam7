import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addDiscountThunk, deleteDiscount, deleteDiscountThunk, editDiscountThunk, loadAllDiscountsThunk  } from "../../store/discount"
import { login } from "../../store/session"

function TestSam() {
    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false)
    const [load, setLoad] = useState(false)


    // creating a new discount address
    const [codeName, setCodeName] = useState("")
    const [applicableCategory, setApplicableCategory] = useState("")
    const [discountType, setDiscountType] = useState("")
    const [discountValue, setDiscountValue] = useState("")
    const [expirationDate, setExpirationDate] = useState("")

    useEffect(() => {
        dispatch(loadAllDiscountsThunk())
        setLoad(true)
    }, [dispatch, refresh])

    const discount = useSelector(state => state.discount)

    console.log('booba', discount)

    const getDiscount = async (e) => {
        e.preventDefault()
        setRefresh(prevState => !prevState)
    }

    const handleCreateNew = (e) => {
        e.preventDefault()

        const newDiscount = {
            codeName,
            applicableCategory,
            discountType
        }

        dispatch(addDiscountThunk(newDiscount)).then(
            setRefresh(prevState => !prevState)
        )
    }

    const handleEdit = (e) => {
        e.preventDefault()

        const editDiscount = {
            codeName: codeName,
            applicableCategory: applicableCategory,
            discountType: discountType
        }

        dispatch(editDiscountThunk(1, editDiscount)).then(
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

        dispatch(deleteDiscountThunk(el.id)).then(
            setRefresh(prevState => !prevState)
        )

    }


    return load ? (
        <div>
            <section>
                <button onClick={(e) => handleSignIn(e)}>Sign in</button>
            </section>
            <section>
                <button onClick={(e) => getDiscount(e)}>
                    <b>GET A DISCOUNT</b>
                </button>
            </section>
            <section>
                {Object.values(discount).map((el, i) => {
                    return (
                        <section onClick={(e) => handleDelete(e, el)}>
                            {el.codeName}
                        </section>
                    )
                })}
            </section>
            <form onSubmit={handleCreateNew}>
                <input
                    type="text"
                    value={codeName}
                    onChange={(e) => setCodeName(e.target.value)}
                />
                <input
                    type="text"
                    value={applicableCategory}
                    onChange={(e) => setApplicableCategory(e.target.value)}
                />
                <input
                    type="text"
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                />
                <input
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                />
                <input
                    type="text"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                />
                <button type="submit">create a new discount</button>
            </form>
        </div>
    ) : (
        <div></div>
    )
}

export default TestSam
