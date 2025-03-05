import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Listitems() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/items`
        );
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      // Delete the product from the database
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/items/${productId}`
      );

      // Update the UI by removing the deleted product
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (err) {
      console.error("Error deleting product:", err);
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

        <div className="border w-full">
          <table className="w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="flex justify-center">
                    <img
                      src={product.images[0]} // Ensure the correct image field
                      alt={product.name}
                      className="w-20 h-24"
                    />
                  </td>
                  <td>
                    {product.name.length > 20
                      ? product.name.slice(0, 20) + "..."
                      : product.name}
                  </td>
                  <td>$ {product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <button onClick={() => handleDelete(product._id)}>X</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Listitems;
