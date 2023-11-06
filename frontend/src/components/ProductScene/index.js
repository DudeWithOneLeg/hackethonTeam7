import { Gltf, PresentationControls, Html } from "@react-three/drei";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as productActions from '../../store/product';
import * as cartActions from '../../store/productcart'
import './index.css'

export default function ProductScene({ product }) {

  const dispatch = useDispatch()
  const loadedProduct = useSelector(state => state.product)

  useEffect(() => {
    console.log(product.productName)
    dispatch(productActions.loadOneProductThunk(product.productName))
  },[dispatch])

  const addToCart = () => {
    dispatch(cartActions.addProductCartThunk(loadedProduct.id))
  }

  return (
    <group position={[15, 2.5, -8]}>
      <PresentationControls
        cursor={true}
        speed={5}
        polar={[0, 0]} // Vertical limits
        azimuth={[-Infinity, Infinity]} // Horizontal limits
      >
        <Gltf
          src={product.src}
          position={[0, 0, 0]}
          rotation={[0, 5.7, 0]}
          // onLoad={(gltf) => handleModelLoad(gltf)}
        />
      </PresentationControls>
      <Html position={[13, 2.5, -8]} center>
        {loadedProduct && <div className='product-info'>
          <h1>{loadedProduct.productName}</h1>
          <h3>$ {loadedProduct.productPrice / 100}</h3>
          <p>{loadedProduct.productDescription}</p>
          <h3>Quantity: {loadedProduct.quantity}</h3>
            <button
              onClick={addToCart}
              >
              Add to cart
            </button>
        </div>}
      </Html>
    </group>
  );
}
