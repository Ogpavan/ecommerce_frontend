import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Orders = () => {
  const { cartItems } = useCart();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        console.log("User not logged in");
      }
    });
  }, []);

  const [clientDetails, setClientDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );
  const shippingFee = 50;
  const total = subtotal + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientDetails((prev) => ({ ...prev, [name]: value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Failed to load Razorpay SDK. Check your internet connection.");
      return;
    }

    const orderData = await fetch(
      `${import.meta.env.VITE_API_URL}/api/create-order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total * 100,
          clientDetails,
          cartItems,
          userId,
        }),
      }
    ).then((res) => res.json());

    const options = {
      key: "rzp_test_GkuBoY156QroSM",
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Your Shop",
      description: "Test Transaction",
      order_id: orderData.orderId,
      handler: function (response) {
        alert("Payment successful!");
        console.log(response);
      },
      prefill: {
        name: `${clientDetails.firstName} ${clientDetails.lastName}`,
        email: clientDetails.email,
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-2/3">
          <h1 className="uppercase text-xl md:text-2xl font-bold pb-6">
            Delivery Information
          </h1>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={clientDetails.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              name="lastName"
              value={clientDetails.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="border border-gray-300 p-2 rounded-md"
            />
            <input
              type="email"
              name="email"
              value={clientDetails.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border border-gray-300 p-2 rounded-md col-span-1 md:col-span-2"
            />
            <input
              type="text"
              name="street"
              value={clientDetails.street}
              onChange={handleInputChange}
              placeholder="Street"
              className="border border-gray-300 p-2 rounded-md col-span-1 md:col-span-2"
            />
            <input
              type="text"
              name="city"
              value={clientDetails.city}
              onChange={handleInputChange}
              placeholder="City"
              className="border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              name="state"
              value={clientDetails.state}
              onChange={handleInputChange}
              placeholder="State"
              className="border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              name="zipcode"
              value={clientDetails.zipcode}
              onChange={handleInputChange}
              placeholder="Zipcode"
              className="border border-gray-300 p-2 rounded-md"
            />
            <input
              type="text"
              name="country"
              value={clientDetails.country}
              onChange={handleInputChange}
              placeholder="Country"
              className="border border-gray-300 p-2 rounded-md"
            />
          </form>
        </div>
        <div className="w-full lg:w-1/3">
          <h1 className="uppercase text-xl md:text-2xl font-bold pb-6">
            Cart Totals
          </h1>
          <hr />
          <div className="flex justify-between py-2">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex justify-between py-2">
            <span>Shipping Fee:</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex justify-between py-2 font-semibold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-black text-white px-4 py-2 rounded mt-4"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
