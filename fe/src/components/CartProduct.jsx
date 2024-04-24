import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function CartProduct() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const resp = await axios.get(
          `${process.env.REACT_APP_SERVER_BASE_URL}/product/${id}`
        );
        setProductData(resp.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    getProductDetails();
  }, [id]);

  if (!productData) {
    return <p>Loading...</p>;
  }

  const { title, price, category, description, createdAt } = productData;

  return (
    <div key={id}>
      <h2>{title}</h2>
      <p>Price: {price}</p>
      <p>Category: {category}</p>
      <p>Description: {description}</p>
      <p>Published on: {new Date(createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default CartProduct;
