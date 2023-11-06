import "./OrderPage.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearOrder, loadAllOrdersThunk, loadUserOrdersThunk } from "../../store/order";
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { loadAllUsersThunk } from "../../store/user";

function OrderPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const orderObj = useSelector((state) => state.order);
  const orders = Object.values(orderObj);
  const userObj = useSelector((state) => state.user);
  const users = Object.values(userObj)


  useEffect(() => {
    if (sessionUser?.id === 1) {
      dispatch(loadAllOrdersThunk());
    } else {
      dispatch(loadUserOrdersThunk(sessionUser?.id))
    }

    dispatch(clearOrder());

    dispatch(loadAllUsersThunk());
  }, [dispatch]);


  // Function to format the date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("default", { month: "short" }); // 'short' gives the abbreviated month name
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  if (!sessionUser) {
    return <Redirect to="/login" />
  }

  return (
    <div className="order-table">
      <div className="order-back-button" onClick={() => history.push('/')}>
        <i className='bx bx-x-circle'></i>
      </div>
      <h1 className="container-header">Orders</h1>
      <div className="table-header">
        <div className="table-cell">Order #</div>
        <div className="table-cell">Order Date</div>
        <div className="table-cell">Status</div>
        <div className="table-cell">Total Amount</div>
        {sessionUser?.id === 1 ? (
          <div className="table-cell">Customer</div>
        ) : <></>}
      </div>
      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-info">
            <div className="table-cell">{order.id}</div>
            <div className="table-cell">{formatDate(order.orderDate)}</div>
            <div className="table-cell">{order.status}</div>
            <div className="table-cell">${order.totalAmount}</div>
            {sessionUser?.id === 1 ? (
              <div className="table-cell">{users.find(user => user.id === order.userId)?.username}</div>
            ) : (<></>)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderPage;
