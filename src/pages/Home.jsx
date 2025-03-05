import React, { useEffect, useState } from "react";
import homeScreen from "../assets/home.jpg";
import { IoIosArrowRoundForward } from "react-icons/io";
import dummy from "../assets/p_img4.png";
import dummy2 from "../assets/p_img5.png";
import quality_icon from "../assets/quality_icon.png";
import support_img from "../assets/support_img.png";
import exchange_icon from "../assets/exchange_icon.png";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/items`
        );
        const allProducts = response.data;
        const bestSellers = allProducts.filter((product) => product.bestSeller);

        setBestsellers(bestSellers);

        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <section>
        <div className="relative mt-4">
          <img
            src={homeScreen}
            alt=""
            className="w-full object-cover h-[420px] md:h-[500px]"
          />
          <div className="absolute top-1/2 left-1/3 transform md:-translate-x-1/2 md:-translate-y-1/2 -translate-x-20  ">
            <p className="outfit-light">New Arrivals</p>
            <h1 className="text-4xl font-bold mb-4 w-1/2 outfit-extrabold">
              Find Your{" "}
              <span className="text-6xl outfit-extrabold">Perfect</span>
            </h1>
            <div className="hidden md:block">
              <button className="border-black border  py-2 px-4 flex items-center">
                SHOP NOW{" "}
                <span>
                  <IoIosArrowRoundForward className="ml-2" size={35} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="md:pt-20 pt-10 pb-8">
          <div className="flex flex-col gap-y-4 justify-center items-center w-full">
            <h1 className="uppercase md:text-2xl  outfit-bold flex items-center">
              <span className="text-gray-400 mr-2">Latest</span>Collections{" "}
              <hr className="w-[70px] bg-black ml-2 h-[3px]" />
            </h1>
            <p className="md:w-3/4 text-xs md:text-md text-center text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
              repellat culpa magni deserunt consequuntur architecto itaque
              voluptates adipisci dolor odit.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="">
          <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center  ">
            {products.map((products) => (
              <Link
                to={`/product/${products._id}`}
                key={products.id}
                className=""
              >
                <div key={products.id} className="max-w-56 ">
                  <img
                    src={products.images[0] || dummy}
                    alt=""
                    className="hover:scale-[1.02] transition-all duration-300 object-cover w-[400px] h-[400px]"
                    onMouseEnter={(e) => {
                      e.target.src = products.images[1] || dummy2;
                    }}
                    onMouseLeave={(e) => {
                      e.target.src = products.images[0] || dummy;
                    }}
                  />
                  <div className="pt-2 outfit-regular text-gray-700 text-sm">
                    {products.name.length > 40
                      ? `${products.name.substring(0, 40)}...`
                      : products.name}
                  </div>

                  <div className="outfit-regular text-gray-800 mt-2">
                    $ {products.price}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="pt-20 pb-8">
          <div className="flex flex-col gap-y-4 justify-center items-center w-full">
            <h1 className="uppercase text-2xl outfit-bold flex items-center">
              <span className="text-gray-400 mr-2">Best</span>Sellers{" "}
              <hr className="w-[70px] bg-black ml-2 h-[3px]" />
            </h1>
            <p className="w-3/4 text-center text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
              repellat culpa
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="">
          <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center ">
            {bestsellers.map((products) => (
              <Link
                to={`/product/${products.id}`}
                key={products.id}
                className=""
              >
                <div key={products.id} className="max-w-56 ">
                  <img
                    src={products.images[0] || dummy}
                    alt=""
                    className="hover:scale-[1.02] transition-all duration-300 object-cover w-[400px] h-[400px]"
                    onMouseEnter={(e) => {
                      e.target.src = products.images[1] || dummy2;
                    }}
                    onMouseLeave={(e) => {
                      e.target.src = products.images[0] || dummy;
                    }}
                  />
                  <div className="pt-2 outfit-regular text-gray-700 text-sm">
                    {products.name}
                  </div>

                  <div className="outfit-regular text-gray-800 mt-2">
                    $ {products.price}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="py-40">
          <div className="flex flex-wrap gap-y-10 justify-evenly">
            <div className=" flex flex-col justify-center items-center">
              <img src={exchange_icon} alt="" className="w-10 pb-2" />
              <h1 className="uppercase text-sm outfit-bold flex items-center">
                Easy Exchange Policy
              </h1>
              <p className="text-gray-500 text-xs outfit-light">
                We offer hassle free exchange policy
              </p>
            </div>

            <div className=" flex flex-col justify-center items-center">
              <img src={quality_icon} alt="" className="w-10 pb-2" />
              <h1 className="uppercase text-sm outfit-bold flex items-center">
                7 Days Return Policy
              </h1>
              <p className="text-gray-500 text-xs outfit-light">
                We offer 7 days return policy
              </p>
            </div>

            <div className=" flex flex-col justify-center items-center">
              <img src={support_img} alt="" className="w-10 pb-2" />
              <h1 className="uppercase text-sm outfit-bold flex items-center">
                24/7 Customer Support
              </h1>
              <p className="text-gray-500 text-xs outfit-light">
                We offer 24/7 customer support
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="">
          <div className="flex flex-col gap-y-4 justify-center items-center w-full">
            <h1 className="uppercase text-2xl outfit-bold flex items-center">
              Subscribe now & get 20% off
            </h1>
            <p className="text-gray-500 outfit-light">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.{" "}
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter Your Email"
                className=" py-2 px-4 w-36 border md:w-96"
              />
              <button className="bg-black border text-white text-sm  outfit-light  py-2 px-4 flex items-center">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
