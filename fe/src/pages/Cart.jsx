import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import MyNavBar from "../components/MyNavBar";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { state, dispatch } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const incrementQuantity = (productId) => {
    dispatch({ type: "INCREMENTA_QUANTITA", payload: { _id: productId } });
  };

  const decrementQuantity = (productId) => {
    dispatch({ type: "DECREMENTA_QUANTITA", payload: { _id: productId } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "RIMUOVI_DAL_CARRELLO", payload: { _id: productId } });
  };

  return (
    <>
      <MyNavBar />
      <div className="cartContainer">
        <h2>Cart</h2>
        {state.cart.length === 0 ? (
          <p>Il carrello è vuoto</p>
        ) : (
          <div className="row d-flex">
            {state.cart.map((product) => (
              <div
                key={product._id}
                className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3 "
              >
                <Card className="cartProduct">
                  <Card.Header>
                    <Card.Title>
                      {product.title.length > 9
                        ? product.title.slice(0, 9) + "..."
                        : product.title}
                    </Card.Title>
                    <Card.Text>Prezzo: {product.price}$</Card.Text>
                  </Card.Header>
                  <Card.Body>
                    <Card.Img
                      variant="top"
                      src={product.cover}
                      alt={product.title}
                    />
                    <div className="cartButtons">
                      <Card.Text>
                        CATEGORY:{" "}
                        {product.category.length > 12
                          ? product.category.slice(0, 12) + "..."
                          : product.category}
                        <br />
                        DESCRIPTION:{" "}
                        {product.description.length > 12
                          ? product.description.slice(0, 12) + "..."
                          : product.description}
                      </Card.Text>
                      <div className="quantity-control">
                        <Button
                          variant="outline-secondary"
                          onClick={() => decrementQuantity(product._id)}
                        >
                          -
                        </Button>
                        <span className="quantity">{product.quantity}</span>
                        <Button
                          variant="outline-secondary"
                          onClick={() => incrementQuantity(product._id)}
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="danger"
                        onClick={() => removeFromCart(product._id)}
                      >
                        Rimuovi dal carrello
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className=" colorChange d-none d-md-block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          fill="currentColor"
          class="bi bi-arrow-right-circle d-none d-md-block colorChange"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
          />
        </svg>

        <span className="finish colorChange d-none d-md-block">
          Finish and pay
        </span>
      </div>
    </>
  );
}

export default Cart;
