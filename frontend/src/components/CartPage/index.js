import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearOrder, loadAllOrdersThunk, loadUserOrdersThunk } from "../../store/order";
import "./CartPage.css";
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { loadUserProductCartThunk } from "../../store/productcart";
import { clearProduct, loadAllProductsThunk } from "../../store/product";
import { clearShipping, loadCurrentShippingThunk } from "../../store/shippingaddress";
import { csrfFetch } from "../../store/csrf";
import { loadUserCartThunk } from "../../store/cart";
import { addStripeSessionThunk } from "../../store/stripesession";

function CartPage() {
  const history = useHistory()
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false)

  useEffect(() => {
    dispatch(loadUserProductCartThunk())
    dispatch(loadUserCartThunk())
    dispatch(loadAllProductsThunk())
    dispatch(loadCurrentShippingThunk()).then(() => {
      setLoad(true)
    })


    dispatch(clearShipping())
    dispatch(clearProduct())
    dispatch(clearOrder())

  }, [dispatch]);

  const user = useSelector((state) => state.session.user);
  const userCart = useSelector(state => state.cart)
  const allProducts = useSelector(state => state.product)
  const cartItems = useSelector(state => state.productCart)
  const shippingAddress = useSelector(state => state.shippingAddress)
  const preppedShippingAddress = Object.values(shippingAddress)[0]

  console.log('booba', preppedShippingAddress)
  // console.log('booba', cartItems)


  // Function to format the date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("default", { month: "short" }); // 'short' gives the abbreviated month name
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  const checkout = async (e) => {
    try {
      // Create a Stripe session
      const sessionResponse = await csrfFetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!sessionResponse.ok) {
        history.push('/');
        return;
      }

      const sessionData = await sessionResponse.json();

      const newStripeSession = {
        userId: user.id,
        sessionId: sessionData.data.id,
        cartId: userCart[0].id
      }

      await dispatch(addStripeSessionThunk(newStripeSession))

      // Redirect the user to the Stripe checkout page
      window.location.href = sessionData.data.url
    } catch (error) {
      // Handle any other errors that may occur
      history.push('/');
    }
  }



  return load ? (
    <div className="cart-table">
      <h1>Cart</h1>
      <div className="table-header">
        <div className="table-cell">Delete</div>
        <div className="table-cell">Name</div>
        <div className="table-cell">Price</div>
        <div className="table-cell">Quantity</div>
      </div>
      <div>
        {Object.values(cartItems).map((cart) => (
          <div className="cart-card" key={cart.id}>
            <div className="cart-info" id="cart-section">
              <section className="table-cell">
                <i className='bx bxs-trash'></i>
              </section>
              <section className="table-cell">
                {allProducts[cart.id].productName}
              </section>
              <section className="table-cell">
                ${cart.pricePerUnit / 100}
              </section>
              <section className="table-cell" id="cart-quantity">
                <aside id="quantity-plus">
                  <i className='bx bx-plus'></i>
                </aside>
                <aside>
                  {cart.quantity}
                </aside>
                <aside id="quantity-minus">
                  <i className='bx bx-minus'></i>
                </aside>
              </section>
            </div>
          </div>
        ))}
      </div>
      <div className="table-header">
        <div className="table-cell">Shipping Address</div>
      </div>
      <div className="table-cell">
        {preppedShippingAddress.shippingAddress} {preppedShippingAddress.shippingState} {preppedShippingAddress.shippingZipCode}
      </div>
      <div>
        <button onClick={(e) => { checkout(e) }} id="checkout-button">Checkout</button>
      </div>
    </div>
  ) : (
    <div></div>
  )
}

export default CartPage;
