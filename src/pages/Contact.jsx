import React from "react";
import contact from "../assets/contact_img.png";

function Contact() {
  return (
    <div>
      <div className="flex justify-center py-10 ">
        <h1 className="uppercase text-2xl outfit-bold flex items-center  ">
          <span className="text-gray-400 mr-2">Contact</span>Us{" "}
          <hr className="w-[70px] bg-black ml-2 h-[3px]" />
        </h1>
      </div>
      <div className="flex">
        <div className=" w-1/2 hidden md:block">
          <img src={contact} alt="about" />
        </div>

        <div className="md:p-10 p-5 ">
          <p className="outfit-regular text-xl text-gray-500">Our Store</p>
          <p className="outfit-light text-gray-500 my-4">
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>

          <p className="outfit-light text-gray-500 mb-4">
            Tel: +91 7302667115
            <br /> Email: connect.pawan69@gmail.com
          </p>
          <h1 className="outfit-regular text-xl text-gray-500">
            Careers at Forever
          </h1>
          <p className="outfit-light text-gray-500 my-2">
            Learn more about our teams and job openings.
          </p>
          <button className="border-black border  text-gray-600 mt-4 py-2 px-4 flex items-center">
            Explore Jobs
          </button>
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

export default Contact;
