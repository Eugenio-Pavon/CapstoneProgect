import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const SingleProduct = ({ product }) => {
  return (
    <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3">
      <Card>
        <Card.Img variant="top" src={product.cover} alt={product.title} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>
            <p>
              <strong>Price:</strong> {product.price}$
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
          </Card.Text>
          <Link to={`/details/${product._id}`} className="btn btn-primary">
            Dettagli
          </Link>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            Published on {new Date(product.createdAt).toLocaleDateString()}
          </small>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default SingleProduct;
