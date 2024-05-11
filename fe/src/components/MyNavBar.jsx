import React from "react";

import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./MyNavBar.css";

const MyNavBar = () => {
  return (
    <Navbar className="mb-5 myNavbar" variant="dark" expand="lg">
      <div className="d-flex container">
        <Navbar.Brand>STRIVESHOP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link as={Link} to="/cart">
              Cart
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default MyNavBar;
