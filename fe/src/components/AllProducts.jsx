import React, { useState, useEffect } from "react";
import axios from "axios";

import SingleProduct from "./SingleProduct";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5;
  const token = JSON.parse(localStorage.getItem("auth"));

  const getProducts = async (page) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/product`,
        {
          params: {
            page,
            pageSize,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      setProducts(resp.data.product);
      setTotalPages(resp.data.totalPages);
      return resp;
    } catch (e) {
      console.error("Error fetching product", e);
    }
  };

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
    <div className="container">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row">
        {filteredProducts.map((product) => (
          <SingleProduct key={product._id} product={product} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default AllProducts;
