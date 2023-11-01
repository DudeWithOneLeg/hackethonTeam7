import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProductThunk, deleteProduct, deleteProductThunk, editProductQuantityThunk, editProductThunk, loadAllProductsThunk, loadFilteredProductsThunk, loadOneProductThunk } from "../../store/product"
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

    const [putProductName, setPutProductName] = useState('')
    const [putProductDescription, setPutProductDescription] = useState("")
    const [putProductPrice, setPutProductPrice] = useState(0)
    const [putQuantity, setPutQuantity] = useState(0)

    const categories = ["Black", "Outdoor"].join(",")
    const filter = 'or'

    useEffect(() => {
        dispatch(loadAllProductsThunk())
        setLoad(true)
    }, [dispatch, refresh])

    const products = useSelector(state => state.product)

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

    const handleEditingProduct = (e) => {
        e.preventDefault()

        const productInfo = {
            productName: putProductName,
            productDescription: putProductDescription,
            productPrice: putProductPrice
        }

        const quantityInfo = {
            quantity: putQuantity
        }

        // dispatch(editProductThunk(1, productInfo))
    }

    const handleQuantity = (e) => {
        e.preventDefault()

        const quantityInfo = {
            quantity: putQuantity
        }
        dispatch(editProductQuantityThunk(1, quantityInfo))
    }

    const deleteProduct = (e, el) => {
        e.preventDefault()

        dispatch(deleteProductThunk(el.id)).then(() => {
            setRefresh(prevState => !prevState)
        })
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
                        type="number"
                        placeHolder="product price"
                        min="1"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeHolder="product quantity"
                        value={quantity}
                        min="1"
                        minVal
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button type="submit">
                        create product
                    </button>
                </form>
            </section>
            <b>EDIT PRODUCT 1</b>
            <section>
                <form onSubmit={(e) => handleEditingProduct(e)}>
                    <input
                        type="text"
                        placeHolder="product name"
                        value={putProductName}
                        onChange={(e) => setPutProductName(e.target.value.trim())}
                    />
                    <input
                        type="text"
                        placeHolder="product description"
                        value={putProductDescription}
                        onChange={(e) => setPutProductDescription(e.target.value.trim())}
                    />
                    <input
                        type="number"
                        placeHolder="product price"
                        min="1"
                        value={putProductPrice}
                        onChange={(e) => setPutProductPrice(e.target.value)}
                    />
                    <button type="submit">
                        create product
                    </button>
                </form>
            </section>
            <b>EDIT PRODUCT QUANTITY</b>
            <section>
                <input
                    type="number"
                    placeHolder="product quantity"
                    value={putQuantity}
                    min="1"
                    minVal
                    onChange={(e) => setPutQuantity(e.target.value)}
                />
                <button onClick={(e) => handleQuantity(e)}>
                    quantity button
                </button>
            </section>
            <section>
                {Object.values(products).map((el, index) => (
                    <div key={index} onClick={(e) => deleteProduct(e, el)}>
                        <section>
                            {el.productName}
                        </section>
                        <section>
                            {el.productDescription}
                        </section>
                        {/* <b>{el.id}</b> */}
                        {/* <section>
                            product id: {el.productId}
                        </section>
                        <section>
                            category id: {el.categoryId}
                        </section> */}
                    </div>
                ))}`
            </section>
        </div>
    ) : (
        <div></div>
    )
}

export default TestSam
