import React, { useState, useEffect } from "react";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
 
  const {cartItems} = useCart();
     // Replace with actual userId (from context or state)

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders/${userId}`);
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        } else {
          console.error("Failed to fetch orders:", data.error);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div>
      <h1 className="text-2xl font-bold">My Orders</h1>
      {orders.length > 0 ? (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order._id} className="order-item">
              <p>
                <strong>Order ID:</strong> {order.orderId}
              </p>
              <p>
                <strong>Total:</strong> ${order.amount / 100}
              </p>
              <p>
                <strong>Status:</strong> {order.status || "Pending"}
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => handleTrackOrder(order._id)}
              >
                Track Order
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders placed yet.</p>
      )}
    </div>
  );
};

export default OrdersList;
