import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Homepage from "./pages/Home";
import Register from "./pages/Register";
import Details from "./pages/Details";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/cart/:id" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
