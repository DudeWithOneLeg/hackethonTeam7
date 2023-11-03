import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllOrdersThunk } from "../../store/order";
import "./OrderPage.css";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function OrderPage() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {
    dispatch(loadAllOrdersThunk());
  }, [dispatch]);

  const orderObj = useSelector((state) => state.order);
  const orders = Object.values(orderObj);

  // Function to format the date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("default", { month: "short" }); // 'short' gives the abbreviated month name
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };


  return (
    <div className="order-table">
      <h1>Orders</h1>
      <div className="table-header">
        <div className="table-cell">Order #</div>
        <div className="table-cell">Order Date</div>
        <div className="table-cell">Status</div>
        <div className="table-cell">Total Amount</div>
        <div className="table-cell">User ID</div>
      </div>
      {orders.map((order) => (
        <div className="order-card" key={order._id}>
          <div className="order-info">
            <div className="table-cell">{order.id}</div>
            <div className="table-cell">{formatDate(order.orderDate)}</div>
            <div className="table-cell">{order.status}</div>
            <div className="table-cell">${order.totalAmount}</div>
            <div className="table-cell">{order.userId}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderPage;
