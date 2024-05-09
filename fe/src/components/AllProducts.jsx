import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllProducts.css";
import SingleProduct from "./SingleProduct";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 12;

  const getProducts = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/product/filter`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            page: currentPage,
            pageSize,
            searchTerm: searchInput,
            category: categories === "All" ? "" : categories,
          },
        }
      );

      setProducts(resp.data.product);
      setTotalPages(resp.data.totalPages);
      setCurrentPage(resp.data.currentPage);
      return resp;
    } catch (e) {
      console.error("Error fetching product", e);
    }
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, [currentPage, categories, searchTerm]);

  const handleCategoriesChange = async (e) => {
    const newCategories = e.target.value;
    setCategories(newCategories);
    setCurrentPage(1);
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/product/filter`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            page: 1,
            pageSize,
            searchTerm,
            category: newCategories === "All" ? "" : newCategories,
          },
        }
      );

      setProducts(resp.data.product);
      setTotalPages(resp.data.totalPages);
      setCurrentPage(resp.data.currentPage);
      return resp;
    } catch (e) {
      console.error("Error fetching product", e);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container allProducts">
      <div>
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="searchSubmit" onClick={handleSearch}>
            Search
          </button>
        </div>

        <select value={categories} onChange={handleCategoriesChange}>
          <option value="All">All</option>
          <option value="electronic">electronic</option>
          <option value="Books">Books</option>
        </select>
      </div>
      <div className="row">
        {products.map((product) => (
          <SingleProduct key={product._id} product={product} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          {"<"}
        </button>

        <span>
          page {currentPage} of {totalPages}
        </span>

        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default AllProducts;
