import React from "react";
import "./Home.css";
import AllProducts from "../components/AllProducts";
import MyNavBar from "../components/MyNavBar";

const Home = () => {
  return (
    <>
      <MyNavBar />
      <AllProducts />
    </>
  );
};

export default Home;
