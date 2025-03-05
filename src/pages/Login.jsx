import React, { useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Check for the authenticated user
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Set the user if logged in
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);
  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      setIsOpen(true); // Open the overlay
      setTimeout(() => {
        setIsOpen(false); // Automatically close after 5 seconds
        navigate("/"); // Navigate to the homepage after login
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center h-[500px] items-center">
      <div className="flex flex-col gap-y-4 items-center">
        <div
          className={`absolute top-0 right-0 w-full h-screen bg-white ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-y-5 justify-center z-10 text-black h-full items-center   px-5">
            {user ? (
              <p className="outfit-light text-center">
                Welcome Back! {user.displayName || "User"}
              </p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <h1 className="text-3xl outfit-light">Login</h1>
        <form
          onSubmit={handlelogin}
          className="flex flex-col gap-y-4 items-center"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-2 py-2 border-[1.5px] border-gray-400 md:w-[400px]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-2 py-2 border-[1.5px] border-gray-400 md:w-[400px]"
          />

          <button className="bg-black border text-white   outfit-light  py-2 px-6 flex items-center">
            Login
          </button>
        </form>
        <Link to="/signup" className="w-full">
          <div className="text-xs text-gray-500 flex justify-center w-full">
            Create one?
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Login;
