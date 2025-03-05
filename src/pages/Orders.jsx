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

    // Create an order on the backend, passing all details
    const orderData = await fetch(
      `${import.meta.env.VITE_API_URL}/api/create-order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total * 100, // Amount in paise
          clientDetails,
          cartItems,
          userId,
        }),
      }
    ).then((res) => res.json());

    const options = {
      key: "rzp_test_GkuBoY156QroSM", // Replace with your Razorpay Key ID
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
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <div className="flex justify-between p-20">
        <div>
          <h1 className="uppercase md:text-2xl outfit-bold flex items-center pb-10">
            <span className="text-gray-400 mr-2">Delivery</span> Information
            <hr className="w-[70px] bg-black ml-2 h-[3px]" />
          </h1>
          <form>
            <div className="flex gap-x-2">
              <input
                type="text"
                name="firstName"
                value={clientDetails.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full border border-gray-300 p-2 mb-2 rounded-md"
              />
              <input
                type="text"
                name="lastName"
                value={clientDetails.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full border border-gray-300 p-2 mb-2 rounded-md"
              />
            </div>
            <input
              type="email"
              name="email"
              value={clientDetails.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full border border-gray-300 p-2 mb-2 rounded-md"
            />
            <input
              type="text"
              name="street"
              value={clientDetails.street}
              onChange={handleInputChange}
              placeholder="Street"
              className="w-full border border-gray-300 p-2 mb-2 rounded-md"
            />
            <div className="flex gap-x-2">
              <input
                type="text"
                name="city"
                value={clientDetails.city}
                onChange={handleInputChange}
                placeholder="City"
                className="w-full border border-gray-300 p-2 mb-2 rounded-md"
              />
              <input
                type="text"
                name="state"
                value={clientDetails.state}
                onChange={handleInputChange}
                placeholder="State"
                className="w-full border border-gray-300 p-2 mb-2 rounded-md"
              />
            </div>
            <div className="flex gap-x-2">
              <input
                type="text"
                name="zipcode"
                value={clientDetails.zipcode}
                onChange={handleInputChange}
                placeholder="Zipcode"
                className="w-full border border-gray-300 p-2 mb-2 rounded-md"
              />
              <input
                type="text"
                name="country"
                value={clientDetails.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="w-full border border-gray-300 p-2 mb-2 rounded-md"
              />
            </div>
          </form>
        </div>
        <div className="md:w-1/3 md:mt-16">
          <h1 className="uppercase md:text-2xl outfit-bold flex items-center pb-10">
            <span className="text-gray-400 mr-2">Cart</span> Totals{" "}
            <hr className="w-[70px] bg-black ml-2 h-[3px]" />
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
            className="  border w-full   bg-black text-white px-4 py-2 rounded mt-4  "
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
