import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase.js";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      // Send verification email
      await sendEmailVerification(user);
      setIsOpen(true);
    } catch (error) {
      console.error("Error during sign-up:", error.message);
    }
  };

  const handletoggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center h-[500px] items-center">
      <div className="flex flex-col gap-y-4 items-center">
        <div
          className={`absolute top-0 right-0 w-full h-screen bg-white ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-y-5 justify-center z-10 text-black h-full items-center outfit-light text-center px-5">
            <p>Verify your email by clicking on the link sent to your email.</p>
            <button
              onClick={() => (window.location.href = "mailto:")}
              className="bg-black border text-white   outfit-light  py-2 px-6 flex items-center"
            >
              Open Mail
            </button>
            <Link to="/login" className="">
              <p
                onClick={handletoggle}
                className="cursor-pointer underline outfit-light"
              >
                Close
              </p>
            </Link>
          </div>
        </div>

        <h1 className="text-3xl outfit-light">Signup</h1>
        <form
          onSubmit={handleSignUp}
          className="flex flex-col gap-y-4 items-center"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-2 py-2 border-[1.5px] border-gray-400 md:w-[400px] "
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="px-2 py-2 border-[1.5px] border-gray-400 md:w-[400px]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-2 py-2 border-[1.5px] border-gray-400 md:w-[400px]"
          />

          <button
            type="submit"
            className="bg-black border text-white   outfit-light  py-2 px-6 flex items-center"
          >
            Create
          </button>
        </form>
        <Link to="/login" className="w-full">
          <div className="text-xs text-gray-500 flex justify-center w-full">
            Already have an account!
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
