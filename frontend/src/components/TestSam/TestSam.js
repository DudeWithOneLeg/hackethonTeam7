import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProductThunk, loadAllProductsThunk, loadFilteredProductsThunk, loadOneProductThunk } from "../../store/product"
import { addProductCategoryThunk, deleteProductCategoryThunk, editProductCategoryThunk, loadAllProductCategoriesThunk, loadProductCategoryByCategory } from "../../store/productcategory"

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
    const [putProductCatgories, setPutProductCategories] = useState("")


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
        dispatch(addProductCategoryThunk(createdProduct.data.id, newProductCategories))

        setRefresh(prevState => !prevState)
    }

    const testDelete = (e, el) => {
        e.preventDefault()

        dispatch(deleteProductCategoryThunk(el.id))
        setRefresh(prevState => !prevState)
    }

    const testPut = (e) => {
        e.preventDefault()

        dispatch(editProductCategoryThunk(1, putProductCatgories))
        setRefresh(prevState => !prevState)
    }

    return load ? (
        <div>
            <b>CREATE NEW PRODUCT TEST</b>
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
            <b>PUT PRODUCT CATEGORY TEST</b>
            <section>
                <input
                    type="text"
                    value={putProductCatgories}
                    onChange={(e) => setPutProductCategories(e.target.value)}
                />
                <button onClick={(e) => testPut(e)}>Put categories</button>
            </section>
            <section>
                {Object.values(productCategories).map((el, index) => (
                    <div key={index} onClick={(e) => testDelete(e, el)}>
                        {/* <section>
                            {el.productName}
                        </section>
                        <section>
                            {el.productDescription}
                        </section> */}
                        <b>{el.id}</b>
                        <section>
                            product id: {el.productId}
                        </section>
                        <section>
                            category id: {el.categoryId}
                        </section>
                    </div>
                ))}`
            </section>
        </div>
    ) : (
        <div></div>
    )
}

export default TestSam
