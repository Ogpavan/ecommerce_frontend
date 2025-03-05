import React from "react";
import about from "../assets/about_img.png";

function About() {
  return (
    <div>
      <div className="flex justify-center py-10 ">
        <h1 className="uppercase text-2xl outfit-bold flex items-center ">
          <span className="text-gray-400 mr-2">About</span>Us{" "}
          <hr className="w-[70px] bg-black ml-2 h-[3px]" />
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center">
        <div className="md:w-1/2">
          <img src={about} alt="about" />
        </div>
        <p className=" text-gray-500 outfit-light md:w-1/2 p-5">
          Forever was born out of a passion for innovation and a desire to
          revolutionize the way people shop online. Our journey began with a
          simple idea: to provide a platform where customers can easily
          discover, explore, and purchase a wide range of products from the
          comfort of their homes.
          <br />
          <br /> Since our inception, we've worked tirelessly to curate a
          diverse selection of high-quality products that cater to every taste
          and preference. From fashion and beauty to electronics and home
          essentials, we offer an extensive collection sourced from trusted
          brands and suppliers.
          <br />
          <br />
          <strong> Our Mission</strong> <br />
          <br />
          Our mission at Forever is to empower customers with choice,
          convenience, and confidence. We're dedicated to providing a seamless
          shopping experience that exceeds expectations, from browsing and
          ordering to delivery and beyond.
        </p>
      </div>
      <div className="flex justify-center py-10 ">
        <h1 className="uppercase  outfit-bold flex items-center ">
          <span className="text-gray-400 mr-2 ">Why</span>Choose Us{" "}
          <hr className="w-[70px] bg-black ml-2 h-[3px]" />
        </h1>
      </div>

      <div className="flex flex-col md:flex-row ">
        <div className="border border-gray-400 md:p-16 p-10 md:border-r-0 text-center ">
          <p className="text-gray-800 outfit-regular">Quality Assurance:</p>
          <p className="text-gray-500 outfit-light">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="border border-gray-400 md:p-16 md:border-r-0 text-center p-10">
          <p className="text-gray-800 outfit-regular">Convenience: </p>
          <p className="text-gray-500 outfit-light">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="border border-gray-400 md:p-16 text-center p-10">
          <p className="text-gray-800 outfit-regular">Customer Service:</p>
          <p className="text-gray-500 outfit-light">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>
      <section>
        <div className="pt-20">
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

export default About;
