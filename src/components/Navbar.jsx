import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import search from "../assets/search icon.png";
import profile from "../assets/profile-icon.png";
import cart from "../assets/Vector.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import menu from "../assets/menu_icon.png";
import { RiCloseLargeFill } from "react-icons/ri";
import { getAuth } from "firebase/auth";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState(null);

  const { cartItems } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }

      return () => unsubscribe();
    });
  }, []);

  const handleOpenMenu = () => {
    if (!user) {
      navigate("/login");
    } else {
      setOpenMenu(!openMenu);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handlelogout = () => {
    const auth = getAuth();
    auth.signOut();
    setOpenMenu(true);
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center py-4 pt-5">
      <div>
        <img src={logo} alt="logo" className="md:w-28 w-24" />
      </div>

      {/* Desktop Menu */}
      <div className="md:block hidden">
        <ul className="flex gap-x-7 uppercase text-sm outfit-regular">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "group relative   after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px]   after:bg-black after:scale-x-100 after:transition-transform after:duration-300"
                  : "group relative text-gray-800 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px]   after:bg-black after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/collection"
              className={({ isActive }) =>
                isActive
                  ? "group relative   after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px]   after:bg-black after:scale-x-100 after:transition-transform after:duration-300"
                  : "group relative text-gray-800 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px]   after:bg-black after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100"
              }
            >
              Collection
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "group relative   after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px]   after:bg-black after:scale-x-100 after:transition-transform after:duration-300"
                  : "group relative text-gray-800 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px]   after:bg-black after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "group relative   after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px]   after:bg-black after:scale-x-100 after:transition-transform after:duration-300"
                  : "group relative text-gray-800 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px]   after:bg-black after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100"
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/additems"
              className="outfit-regular border rounded-full px-4 py-1 text-gray-600 text-sm"
            >
              Admin Panel
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Desktop Icons */}
      <div className="md:block hidden">
        <div className="flex gap-x-4">
          <button>
            <img src={search} alt="search" className="w-4" />
          </button>
          <Link to="/cart">
            <button>
              <div className="relative">
                <p className=" bg-black rounded-full w-4 h-4 text-white absolute text-sm flex justify-center items-center translate-x-2 translate-y-1 ">
                  {cartItems.length}
                </p>
                <img src={cart} alt="cart" className="w-4" />
              </div>
            </button>
          </Link>
          <button onClick={handleOpenMenu}>
            <img src={profile} alt="profile" className="w-4" />
            {user && (
              <div
                className={`w-28 z-10 -translate-x-24 bg-white transition-all shadow-md overflow-hidden duration-300 absolute ${
                  openMenu ? "h-0" : "h-24"
                }`}
              >
                <div className="flex flex-col gap-y-2 p-4">
                  <Link
                    to="/ordersplaced"
                    className="outfit-light"
                    onClick={handleOpenMenu}
                  >
                    Orders
                  </Link>
                  <hr className="h-[1px] " />
                  <Link className="outfit-light" onClick={handlelogout}>
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden block">
        <button onClick={toggleMenu}>
          <img src={menu} alt="menu" className="w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden block fixed top-0 left-0 w-full h-full bg-white z-50 transform transition-transform duration-300 ${
          isOpen ? "-translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <RiCloseLargeFill className="text-2xl" />
          </button>
        </div>
        <div className="flex flex-col px-5">
          <ul className="flex flex-col gap-y-7 uppercase outfit-light">
            <li>
              <NavLink
                onClick={toggleMenu}
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "group relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-black after:scale-x-100 after:transition-transform after:duration-300"
                    : "group relative text-gray-800 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={toggleMenu}
                to="/collection"
                className={({ isActive }) =>
                  isActive
                    ? "group relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-black after:scale-x-100 after:transition-transform after:duration-300"
                    : "group relative text-gray-800 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100"
                }
              >
                Collection
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={toggleMenu}
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "group relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-black after:scale-x-100 after:transition-transform after:duration-300"
                    : "group relative text-gray-800 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100"
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={toggleMenu}
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "group relative after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-black after:scale-x-100 after:transition-transform after:duration-300"
                    : "group relative text-gray-800 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
