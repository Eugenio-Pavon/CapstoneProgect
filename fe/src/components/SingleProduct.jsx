import React from "react";
import "./AllProducts.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {
  return (
    <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
      <Card>
        <Card.Img
          variant="top"
          src={product.cover}
          alt={product.title}
          className=""
        />
        <Card.Body>
          <Card.Title className="mainTitle">
            {product.title.length > 16
              ? product.title.slice(0, 16) + "..."
              : product.title}
          </Card.Title>
          <Card.Text className="text_card">
            <span className="mb-1">
              <strong>Price:</strong> {product.price}$
            </span>

            <span class="d-none d-md-block mb-1">
              <strong>Category:</strong>{" "}
              {product.category.length > 12
                ? product.category.slice(0, 12) + "..."
                : product.category}
            </span>
            <span class="d-none d-md-block mb-1">
              <strong>Description:</strong>{" "}
              {product.description.length > 12
                ? product.description.slice(0, 25) + "..."
                : product.description}
            </span>
          </Card.Text>
          <Link to={`/details/${product._id}`} className="btn btn-primary">
            Dettagli
          </Link>
        </Card.Body>
        <Card.Footer class="d-none d-md-block">
          <small className="text-muted">
            Published on {new Date(product.createdAt).toLocaleDateString()}
          </small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SingleProduct;
