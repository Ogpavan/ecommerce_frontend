import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Orderlist() {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders`
        ); // Update with your backend URL
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Toggle expanded order
  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Delete order
  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/orders/${orderId}`
      );
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 flex justify-center">
        <ul className="flex flex-col gap-y-6 p-10">
          <Link to="/additems">
            <li className="outfit-regular border-b border-gray-600 cursor-pointer">
              Add items
            </li>
          </Link>
          <Link to="/listitems">
            <li className="outfit-regular border-b border-gray-600 cursor-pointer">
              List items
            </li>
          </Link>
          <li className="outfit-regular border-b border-gray-600 cursor-pointer">
            Orders
          </li>
        </ul>
      </div>

      {/* Orders List */}
      <div className="w-3/4 p-10">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Order ID</th>
                <th className="border border-gray-300 p-2">Item Name</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  {/* Collapsed Row (Order ID + First Item Name) */}
                  <tr
                    className="border border-gray-300 cursor-pointer hover:bg-gray-100"
                    onClick={() => toggleOrderDetails(order._id)}
                  >
                    <td className="border border-gray-300 p-2">{order._id}</td>
                    <td className="border border-gray-300 p-2">
                      {order.cartItems[0]?.name}{" "}
                      {order.cartItems.length > 1
                        ? `+ ${order.cartItems.length - 1} more`
                        : ""}
                    </td>
                  </tr>

                  {/* Expanded Row (Full Order Details) */}
                  {expandedOrder === order._id && (
                    <tr>
                      <td colSpan="2" className="p-4 border border-gray-300">
                        <div className="bg-gray-100 p-4 rounded-md">
                          <h3 className="text-lg font-semibold mb-2">
                            Order Details
                          </h3>
                          <p>
                            <strong>Order ID:</strong> {order._id}
                          </p>
                          <p>
                            <strong>Status:</strong> {order.status || "Pending"}
                          </p>
                          <p>
                            <strong>Total Amount:</strong> ₹
                            {(order.amount / 100).toFixed(2)}
                          </p>
                          <p>
                            <strong>Created At:</strong>{" "}
                            {new Date(order.createdAt).toLocaleString()}
                          </p>

                          <h3 className="text-lg font-semibold mt-4">
                            Customer Details
                          </h3>
                          <p>
                            <strong>Name:</strong>{" "}
                            {order.clientDetails.firstName}{" "}
                            {order.clientDetails.lastName}
                          </p>
                          <p>
                            <strong>Email:</strong> {order.clientDetails.email}
                          </p>
                          <p>
                            <strong>Address:</strong>{" "}
                            {order.clientDetails.street},{" "}
                            {order.clientDetails.city},{" "}
                            {order.clientDetails.state},{" "}
                            {order.clientDetails.zipcode},{" "}
                            {order.clientDetails.country}
                          </p>

                          <h3 className="text-lg font-semibold mt-4">Items</h3>
                          <table className="w-full border-collapse border border-gray-400 mt-2">
                            <thead>
                              <tr className="bg-gray-200">
                                <th className="border border-gray-400 p-2">
                                  Item Name
                                </th>
                                <th className="border border-gray-400 p-2">
                                  Size
                                </th>
                                <th className="border border-gray-400 p-2">
                                  Price
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.cartItems.map((item, index) => (
                                <tr
                                  key={item._id + index}
                                  className="border border-gray-400"
                                >
                                  <td className="border border-gray-400 p-2">
                                    {item.name}
                                  </td>
                                  <td className="border border-gray-400 p-2">
                                    {item.size}
                                  </td>
                                  <td className="border border-gray-400 p-2">
                                    ₹{item.price}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          {/* Delete Button */}
                          <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                            onClick={() => deleteOrder(order._id)}
                          >
                            Delete Order
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Orderlist;
