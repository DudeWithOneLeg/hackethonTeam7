import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProductThunk, loadAllProductsThunk, loadFilteredProductsThunk, loadOneProductThunk } from "../../store/product"
import { addProductCategoryThunk, loadAllProductCategoriesThunk, loadProductCategoryByCategory } from "../../store/productcategory"

function TestSam() {
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

    // test creating new product
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState("")
    const [productPrice, setProductPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)

    const [refresh, setRefresh] = useState(false)

    const [newProductCategories, setNewProductCategories] = useState("")


    const categories = ["Black", "Outdoor"].join(",")
    const filter = 'or'

    useEffect(() => {
        // dispatch(loadOneProductThunk(1))
        // dispatch(loadAllProductsThunk())
        dispatch(loadFilteredProductsThunk(categories, filter))
        dispatch(loadAllProductCategoriesThunk())
        setLoad(true)
    }, [dispatch, refresh])

    const products = Object.values(useSelector(state => state.product))
    const productCategories = useSelector(state => state.productCategory)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newProduct = {
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            quantity: quantity
        }

        const createdProduct = await dispatch(addProductThunk(newProduct))
        console.log('booba', createdProduct)
        dispatch(addProductCategoryThunk(createdProduct.data.id, newProductCategories))

        setRefresh(prevState => !prevState)
    }

    return load ? (
        <div>
            <section>
                {products.map((el, index) => (
                    <div key={index}>
                        <section>
                            {el.productName}
                        </section>
                        <section>
                            {el.productDescription}
                        </section>
                    </div>
                ))}`
            </section>
            <section>
                <input
                    type="text"
                    value={newProductCategories}
                    onChange={(e) => setNewProductCategories(e.target.value.trim())}
                />
            </section>
            <section>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeHolder="product name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value.trim())}
                    />
                    <input
                        type="text"
                        placeHolder="product description"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value.trim())}
                    />
                    <input
                        type="text"
                        placeHolder="product price"
                        min="1"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                    />
                    <input
                        type="text"
                        placeHolder="product quantity"
                        value={quantity}
                        min="1"
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button type="submit">
                        create product
                    </button>
                </form>
            </section>
        </div>
    ) : (
        <div></div>
    )
}

export default TestSam
