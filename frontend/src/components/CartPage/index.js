import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearOrder, loadAllOrdersThunk, loadUserOrdersThunk } from "../../store/order";
import "./CartPage.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { loadUserProductCartThunk } from "../../store/productcart";
import { loadAllProductsThunk } from "../../store/product";
import { loadCurrentShippingThunk } from "../../store/shippingaddress";

function CartPage() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  const [load, setLoad] = useState(false)

  useEffect(() => {
    dispatch(loadUserProductCartThunk())
    dispatch(loadAllProductsThunk())
    dispatch(loadCurrentShippingThunk())

    dispatch(clearOrder())

    setLoad(true)
  }, [dispatch]);

  const allProducts = useSelector(state => state.product)
  const cartItems = useSelector(state => state.productCart)
  const shippingAddress = useSelector(state => state.shippingAddress)
  console.log('booba', allProducts)
  console.log('booba', cartItems)


  // Function to format the date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("default", { month: "short" }); // 'short' gives the abbreviated month name
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };



  return load ? (
    <div className="cart-table">
      <h1>Cart</h1>
      <div className="table-header">
        <div className="table-cell">Delete</div>
        <div className="table-cell">Name</div>
        <div className="table-cell">Price</div>
        <div className="table-cell">Quantity</div>
      </div>
      {Object.values(cartItems).map((cart) => (
        <div className="cart-card" key={cart.id}>
          <div className="cart-info" id="cart-section">
            <section className="table-cell"><i className='bx bxs-trash'></i></section>
            <section className="table-cell">{allProducts[cart.id].productName}</section>
            <section className="table-cell">${cart.pricePerUnit / 100}</section>
            <section className="table-cell" id="cart-quantity">
              <aside>
                <i className='bx bx-plus'></i>
              </aside>
              <aside>
                {cart.quantity}
              </aside>
              <aside>
                <i className='bx bx-minus'></i>
              </aside>
            </section>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div></div>
  )
}

export default CartPage;
