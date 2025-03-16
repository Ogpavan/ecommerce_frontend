import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

function Products() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState();
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false); // Track if item is added

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productId) {
          console.error("Product ID is undefined!");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/items/${productId}`
        );
        console.log("Product data:", response.data);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size!");
      return;
    }
    addToCart({ ...product, size: selectedSize });
    setAdded(true); // Change button text to "Added to Cart"
    setTimeout(() => setAdded(false), 2000); // Reset after 2 seconds
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row w-full justify-center mt-10">
        <div>
          <div className="flex flex-col-reverse md:flex-row gap-3">
            <div className="md:flex-col flex gap-y-3 gap-x-2 overflow-x-auto">
              {product.images && product.images.length > 0 ? (
                product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={product.name}
                    onClick={() => setMainImage(img)}
                    className="max-w-20 cursor-pointer transition-all duration-500 ease-in-out"
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
            <img
              src={mainImage || product.images[0] || "/placeholder-image.jpg"}
              alt={product.name}
              className="max-w-[400px] object-cover transition-all duration-500 ease-in-out transform"
            />
          </div>
        </div>
        <div className="md:w-1/2 md:px-10 mt-10 flex flex-col gap-y-3">
          <h2 className="text-2xl outfit-regular text-gray-800">
            {product.name}
          </h2>
          <div className="text-gray-800 mt-2 outfit-light">
            <span className="line-through text-red-400">
              ${product.price + 200}
            </span>{" "}
            &nbsp; ${product.price}
          </div>

          <p>Select Size</p>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`border border-gray-400 w-10 h-10 ${
                  selectedSize === size ? "bg-black text-white" : ""
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="mt-2 w-full md:w-auto">
            <button
              onClick={handleAddToCart}
              className={`w-full md:w-auto py-2 px-6 text-white outfit-light rounded transition-all duration-300 ${
                added ? "bg-green-600" : "bg-black"
              }`}
            >
              {added ? "Added to Cart ✅" : "Add to Cart"}
            </button>
          </div>
          <hr className="my-2" />
          <div className="text-center md:text-left">
            <p className="text-sm outfit-light text-gray-800">
              100% Original product.
            </p>
            <p className="text-sm outfit-light text-gray-800">
              Cash on delivery is available on this product.
            </p>
            <p className="text-sm outfit-light text-gray-800">
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-20 flex flex-col">
          <div>
            <span className="outfit-regular text-gray-700 border px-4 py-2 border-b-0">
              Description
            </span>
          </div>
          <p className="text-gray-600 outfit-light border md:p-10 p-5 text-justify text-xs mt-1">
            {product.description || "No detailed description available."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Products;
