import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import MyNavBar from "../components/MyNavBar";
import "./Details.css";
import Footer from "../components/Footer";

function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart();

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const resp = await axios.get(
          `${process.env.REACT_APP_SERVER_BASE_URL}/product/${id}`
        );
        setProduct(resp.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    getProductDetails();
  }, [id]);

  const addToCart = () => {
    dispatch({ type: "AGGIUNGI_AL_CARRELLO", payload: product });
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <MyNavBar />
      <div key={product._id} className="details-container">
        <h2>{product.title}</h2>
        <img style={{ width: 200 }} src={product.cover} alt={product.title} />
        <p>
          <strong>Price:</strong> {product.price}$
        </p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Published on:</strong>{" "}
          {new Date(product.createdAt).toLocaleDateString()}
        </p>
        <button onClick={addToCart}>Add to cart</button>
        <Link to="/cart">Go to cart</Link>
      </div>
      <Footer />
    </>
  );
}

export default Details;
