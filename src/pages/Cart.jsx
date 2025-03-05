import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(50); // Example shipping fee
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const calculateSubtotal = () => {
      const subtotal = cartItems.reduce((total, item) => {
        const validPrice = parseFloat(item.price) || 0;
        const validQuantity = parseInt(item.quantity) || 1;
        return total + validPrice * validQuantity;
      }, 0);
      setSubtotal(subtotal);
    };

    calculateSubtotal();
  }, [cartItems]);

  useEffect(() => {
    setTotal(subtotal + shippingFee);
  }, [subtotal, shippingFee]);

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      updateQuantity(id, quantity);
    }
  };

  return (
    <div className="md:mt-10 mt-5">
      <h1 className="uppercase md:text-2xl outfit-bold flex items-center py-5">
        <span className="text-gray-400 mr-2">Your</span>Cart{" "}
        <hr className="w-[70px] bg-black ml-2 h-[3px]" />
      </h1>
      <hr />
      <div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-3 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="flex items-center gap-x-8">
                      <div>₹{item.price}</div>
                      <div className="border w-10 h-8 flex items-center justify-center">
                        {item.size}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={item.quantity || 1}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.id,
                        parseInt(e.target.value) || 1
                      )
                    }
                    min="1"
                    className="w-16 text-center border p-1"
                  />
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="ml-3 text-red-500 hover:text-red-700"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end">
          <div className="flex flex-col mt-10 md:w-1/3">
            <h1 className="uppercase md:text-xl outfit-bold flex items-center py-5">
              <span className="text-gray-400 mr-2">Cart</span>Totals{" "}
              <hr className="w-[70px] bg-black ml-2 h-[3px]" />
            </h1>
            <div className="flex justify-between py-2">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Shipping Fee:</span>
              <span>₹{shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <Link to="/orders" className="w-full">
              <button className="bg-black text-white py-2 mt-4 w-full">
                {loading ? "Processing..." : "Checkout"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
