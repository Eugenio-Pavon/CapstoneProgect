import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col } from "react-bootstrap";
import AxiosClient from "../client/client";
import { useNavigate, Link } from "react-router-dom";
import MyNavBar from "../components/MyNavBar";
import "./Login.css";
import Footer from "../components/Footer";

const Login = () => {
  const client = new AxiosClient();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("auth", JSON.stringify(token));
      navigate("/cart");
    }
  }, []);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post("/login", formData);
      if (response.statusCode === 200) {
        localStorage.setItem("auth", JSON.stringify(response.token));
        navigate("/cart");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("EMAIL OR PASSWORD ERROR");
      } else if (error.response && error.response.status === 404) {
        setError("USER ERROR");
      }
    }
  };

  const handleLoginWithGithub = () => {
    window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/github`;
  };

  return (
    <>
      <MyNavBar />
      <div className="loginForm">
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={onSubmit} className="m-5 ">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              onChange={onChangeInput}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              onChange={onChangeInput}
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Col>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Col>
          </Form.Group>

          <Form.Group className="mb-3">
            <Col>
              if you are not registered
              <Link to="/register">Register here</Link>
            </Col>
          </Form.Group>

          <Form.Group>
            <Col>
              {/* <Button
                onClick={handleLoginWithGithub}
                variant="success"
                type="button"
              >
                Login with Github
              </Button> */}
            </Col>
          </Form.Group>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
