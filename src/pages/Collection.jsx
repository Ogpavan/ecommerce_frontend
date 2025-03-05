import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoFilter } from "react-icons/io5";

function Collection() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ categories: [], subCategory: [] });
  const [sortOption, setSortOption] = useState("");
  const [showFilters, setShowFilters] = useState(false); // State for filter visibility

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/items`
        );
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize with all products
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  const handleFilterChange = (e, filterType) => {
    const { id, checked } = e.target;

    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [filterType]: prevFilters[filterType] || [], // Ensure the key exists and is an array
      };

      if (checked) {
        updatedFilters[filterType].push(id.toLowerCase());
      } else {
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (item) => item !== id.toLowerCase()
        );
      }

      return updatedFilters;
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = products;

      if (filters.categories.length > 0) {
        filtered = filtered.filter((product) =>
          filters.categories.includes(product.category.toLowerCase())
        );
      }

      if (filters.subCategory.length > 0) {
        filtered = filtered.filter(
          (product) =>
            product.subCategory &&
            filters.subCategory.includes(product.subCategory.toLowerCase())
        );
      }

      if (sortOption) {
        filtered = filtered.slice(); // Clone the array
        if (sortOption === "Low to High") {
          filtered.sort((a, b) => a.price - b.price);
        } else if (sortOption === "High to Low") {
          filtered.sort((a, b) => b.price - a.price);
        } else if (sortOption === "Latest") {
          filtered.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        }
      }
      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [filters, sortOption, products]);

  return (
    <section>
      <div className="flex flex-col md:flex-row">
        {/* Filters Section */}
        <button
          className="md:hidden flex items-center px-4 py-2 justify-between "
          onClick={() => setShowFilters(!showFilters)}
        >
          <h1 className=" outfit-regular text-gray-800 ">Filters</h1>
          <span className={`ml-2 transform ${showFilters ? "rotate-180" : ""}`}>
            <IoFilter />
          </span>
        </button>
        <div
          className={`transition-all duration-300 md:block ${
            showFilters ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col gap-y-6 mt-6">
            <div className="border md:w-56 px-5 pb-3 outfit-light">
              <h1 className="py-2 outfit-regular">Categories</h1>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="Men"
                    className="w-4 h-4 rounded mr-2"
                    onChange={(e) => handleFilterChange(e, "categories")}
                  />
                  <label htmlFor="Men">Men</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="Women"
                    className="w-4 h-4 rounded mr-2"
                    onChange={(e) => handleFilterChange(e, "categories")}
                  />
                  <label htmlFor="Women">Women</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="Kids"
                    className="w-4 h-4 rounded mr-2"
                    onChange={(e) => handleFilterChange(e, "categories")}
                  />
                  <label htmlFor="Kids">Kids</label>
                </div>
              </div>
            </div>

            <div className="border md:w-56 px-5 pb-3 outfit-light">
              <h1 className="py-2 outfit-regular">Type</h1>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="topwear"
                    className="w-4 h-4 rounded mr-2"
                    onChange={(e) => handleFilterChange(e, "subCategory")}
                  />
                  <label htmlFor="topwear">Topwear</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="bottomwear"
                    className="w-4 h-4 rounded mr-2"
                    onChange={(e) => handleFilterChange(e, "subCategory")}
                  />
                  <label htmlFor="bottomwear">Bottomwear</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="winterwear"
                    className="w-4 h-4 rounded mr-2"
                    onChange={(e) => handleFilterChange(e, "subCategory")}
                  />
                  <label htmlFor="winterwear">Winterwear</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <div className="w-full flex flex-col md:flex-row justify-between pt-4 px-3">
            <h1 className="uppercase text-2xl outfit-bold flex items-center">
              <span className="text-gray-400 mr-2">All</span>Collections{" "}
              <hr className="w-[70px] bg-black ml-2 h-[3px]" />
            </h1>
            <select
              className="border px-5 py-2 outfit-light mt-5 md:mt-0"
              onChange={handleSortChange}
            >
              <option value="">Sort by</option>
              <option value="Low to High">Low to High</option>
              <option value="High to Low">High to Low</option>
              <option value="Latest">Latest</option>
            </select>
          </div>
          <section>
            <div className="pt-6">
              <div className="flex flex-wrap gap-x-4 gap-y-6 justify-center">
                {filteredProducts.map((product) => (
                  <Link to={`/product/${product._id}`} key={product.id}>
                    <div key={product.id} className="max-w-56">
                      <img
                        src={product.images[0]}
                        alt=""
                        className="w-56 h-72 object-cover"
                      />
                      <div className="pt-2 outfit-regular text-gray-700">
                        {product.name.length > 28
                          ? product.name.slice(0, 28)
                          : product.name}
                        ...
                      </div>

                      <div className="outfit-regular text-gray-800">
                        $ {product.price}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}

export default Collection;
