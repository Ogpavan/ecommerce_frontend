import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import home from "../assets/home.jpg";
import home3 from "../assets/home3.jpg";
import { IoIosArrowRoundForward } from "react-icons/io";
import dummy from "../assets/p_img4.png";
import dummy2 from "../assets/p_img5.png";
import quality_icon from "../assets/quality_icon.png";
import support_img from "../assets/support_img.png";
import exchange_icon from "../assets/exchange_icon.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

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
        console.log("Best Sellers:", bestSellers[0]._id);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      }
    };

    fetchProducts();
  }, []);

  const images = [
    {
      image: home,
      subtext: "New Arrivals",
      heading: "Find Your",
      highlight: "Perfect",
    },
    {
      image: home3,
      subtext: "Exclusive Collection",
      heading: "Style That",
      highlight: "Shines",
    },
  ];

  return (
    <div>
      <section>
        <div className="relative mt-4">
          {/* Swiper for Home Screen */}
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className="w-full"
          >
            {images.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.img
                  src={item.image}
                  alt="Hero Slide"
                  className="w-full object-cover h-[420px] md:h-[500px] opacity-0"
                  loading="lazy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                {/* Animated Text Overlay */}
                <motion.div
                  className="absolute top-[45%] md:top-[30%] md:left-[10%] left-[5%] "
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.p
                    className="outfit-light "
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    {item.subtext}
                  </motion.p>

                  <motion.h1
                    className="text-4xl font-bold mb-4 w-1/2 outfit-extrabold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    {item.heading}{" "}
                    <motion.span
                      className="text-6xl outfit-extrabold"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                    >
                      {item.highlight}
                    </motion.span>
                  </motion.h1>

                  {/* Button with Hover Effect */}
                  <div className="hidden md:block">
                    <motion.button
                      className="border-black border py-2 px-4 flex items-center hover:bg-black hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      SHOP NOW{" "}
                      <IoIosArrowRoundForward className="ml-2" size={35} />
                    </motion.button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
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

      {/* //Latest section  */}
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
            {products.map((product) => {
              const firstImage = product.images[0] || dummy;
              const secondImage = product.images[1] || dummy2;

              return (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="block"
                >
                  <div className="w-full max-w-xs mx-auto">
                    <img
                      src={firstImage}
                      alt={product.name}
                      className="hover:scale-[1.02] transition-transform duration-300 object-cover w-full md:h-64 opacity-0"
                      loading="lazy"
                      onLoad={(e) => e.target.classList.add("opacity-100")}
                      onMouseEnter={(e) => (e.target.src = secondImage)}
                      onMouseLeave={(e) => (e.target.src = firstImage)}
                    />
                    <div className="pt-2 text-gray-700 text-sm outfit-light text-center">
                      {product.name.length > 40
                        ? `${product.name.substring(0, 40)}...`
                        : product.name}
                    </div>
                    <div className="text-gray-800 mt-2 text-center outfit-light">
                      <span className="line-through text-red-400">
                        ${product.price + 200}
                      </span>
                      &nbsp; ${product.price}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best sellers */}
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
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
            {bestsellers.map((products) => (
              <Link
                to={`/product/${products._id}`}
                key={products.id}
                className=""
              >
                <div key={products.id} className="max-w-56 ">
                  <img
                    src={products.images[0] || dummy}
                    alt=""
                    className="hover:scale-[1.02] transition-all duration-300 object-cover md:w-[400px] md:h-[400px]"
                    onMouseEnter={(e) => {
                      e.target.src = products.images[1] || dummy2;
                    }}
                    onMouseLeave={(e) => {
                      e.target.src = products.images[0] || dummy;
                    }}
                  />
                  <div className="pt-2 text-gray-700 text-sm outfit-light text-center">
                    {products.name.length > 40
                      ? `${products.name.substring(0, 40)}...`
                      : products.name}
                  </div>
                  <div className="text-gray-800 mt-2 text-center outfit-light">
                    <span className="line-through text-red-400">
                      ${products.price + 200}
                    </span>{" "}
                    &nbsp; ${products.price}
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
