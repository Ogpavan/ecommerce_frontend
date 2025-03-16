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
    <div className="container mx-auto px-4 md:px-8 lg:px-16 mt-5 md:mt-10">
      <h1 className="uppercase text-lg md:text-2xl outfit-bold flex items-center py-5">
        <span className="text-gray-400 mr-2">Your</span>Cart
        <hr className="w-16 md:w-[70px] bg-black ml-2 h-[3px]" />
      </h1>
      <hr />

      <div className="mt-5">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-center py-3 border-b"
              >
                {/* Product Image & Details */}
                <div className="flex items-center w-full sm:w-auto">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-20 md:w-16 md:h-16 object-cover rounded-lg mr-4"
                  />
                  <div className="text-center sm:text-left">
                    <div className="pt-2 text-gray-800 text-sm outfit-regular text-center">
                      {item.name.length > 25
                        ? `${item.name.substring(0, 25)}...`
                        : item.name}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-1 text-sm md:text-base">
                      <div>₹{item.price}</div>
                      <div className="border w-10 h-8 flex items-center justify-center">
                        {item.size}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quantity & Remove Button */}
                <div className="flex items-center mt-3 sm:mt-0">
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
                    className="w-14 md:w-16 text-center border p-1 rounded-md"
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

        {/* Cart Totals Section */}
        <div className="flex flex-col items-center sm:items-end">
          <div className="mt-10 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
            <h1 className="uppercase text-lg md:text-xl outfit-bold flex items-center py-5">
              <span className="text-gray-400 mr-2">Cart</span>Totals
              <hr className="w-16 md:w-[70px] bg-black ml-2 h-[3px]" />
            </h1>

            <div className="space-y-3 text-sm md:text-base">
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
            </div>

            {/* Checkout Button */}
            <Link to="/orders" className="w-full">
              <button className="bg-black text-white py-2 mt-4 w-full rounded-md text-sm md:text-base">
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
