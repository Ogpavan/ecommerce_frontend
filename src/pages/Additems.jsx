import React, { useState } from "react";
import axios from "axios";
import download from "../assets/download.png";
import { Link } from "react-router-dom";

const UploadSquare = ({ id, setImages, images }) => {
  const [dragging, setDragging] = useState(false);

  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  // Handle drag leave event
  const handleDragLeave = () => {
    setDragging(false);
  };

  // Handle file drop event
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const updatedImages = [...images];
      updatedImages[id - 1] = file;
      setImages(updatedImages);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const updatedImages = [...images];
      updatedImages[id - 1] = file;
      setImages(updatedImages);
    }
  };

  return (
    <div
      className={`w-20 h-20 border-2 border-dotted rounded-sm  transition-all duration-300 
                  ${
                    dragging
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300 bg-white"
                  } 
                  flex justify-center items-center`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById(`file-input-${id}`).click()}
    >
      <input
        id={`file-input-${id}`}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex flex-col justify-center items-center">
        {images[id - 1] ? (
          <img
            src={URL.createObjectURL(images[id - 1])}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <img src={download} alt="Placeholder" />
        )}
      </div>
    </div>
  );
};

function Additems() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("men");
  const [subCategory, setSubCategory] = useState("topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [images, setImages] = useState([null, null, null, null]);

  const [loading, setLoading] = useState(false);

  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async () => {
    if (
      !productName ||
      !description ||
      !price ||
      !sizes.length ||
      !images.some((img) => img)
    ) {
      alert("Please fill in all fields and upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("price", price);
    formData.append("sizes", sizes.join(","));
    formData.append("bestSeller", bestSeller);
    images.forEach((image, index) => {
      if (image) formData.append("images", image);
    });

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/products`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setLoading(false);
      alert("Product uploaded successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to upload product.");
    }
  };

  return (
    <div>
      <div className="flex">
        <div className="w-1/4 bg-gray-200 flex justify-center">
          <ul className="flex flex-col gap-y-6 p-10">
            <Link to="/additems">
              <li className="outfit-regular border-b border-gray-600 cursor-pointer">
                Add items
              </li>
            </Link>
            <Link to="/listitems">
              <li className="outfit-regular border-b border-gray-600 cursor-pointer">
                List items
              </li>
            </Link>
            <Link to="/orderlist">
              <li className="outfit-regular border-b border-gray-600 cursor-pointer">
                Orders
              </li>
            </Link>
          </ul>
        </div>
        <div className="border w-full  p-5">
          <h1 className="outfit-regular mb-5 text-gray-700">Upload Images</h1>
          <div className="flex gap-x-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <UploadSquare
                key={index}
                id={index + 1}
                setImages={setImages}
                images={images}
              />
            ))}
          </div>
          <h1 className="outfit-regular mt-5 text-gray-700">Product name</h1>
          <input
            type="text"
            placeholder="Product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-sm"
          />
          <h1 className="outfit-regular mt-5 text-gray-700">
            Product description
          </h1>
          <textarea
            placeholder="Product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-sm"
          />
          <div className="flex gap-x-5 mt-4">
            <div>
              <label className="outfit-regular mt-5 text-gray-700">
                Product Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-sm"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
            </div>
            <div>
              <label className="outfit-regular mt-5 text-gray-700">
                Sub Category
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-sm"
              >
                <option value="topwear">Topwear</option>
                <option value="bottomwear">Bottomwear</option>
                <option value="winterwear">Winterwear</option>
              </select>
            </div>
            <div>
              <label className="outfit-regular mt-5 text-gray-700">Price</label>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-sm"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="outfit-regular text-gray-700">
              Product Sizes
            </label>
            <div className="flex gap-x-5">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`p-2 w-10 h-10 border rounded-sm ${
                    sizes.includes(size)
                      ? "bg-gray-700 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="flex gap-x-2 items-center mt-4">
              <input
                type="checkbox"
                checked={bestSeller}
                onChange={() => setBestSeller((prev) => !prev)}
              />
              <label className="outfit-regular text-gray-700">
                Add to bestsellers
              </label>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`py-2 px-6 rounded-sm mt-4 ${
                  loading
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-black text-white"
                }`}
              >
                {loading ? "Uploading..." : "Upload Product"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Additems;
