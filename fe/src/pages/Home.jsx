import React from "react";
import "./Home.css";
import AllProducts from "../components/AllProducts";
import MyNavBar from "../components/MyNavBar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <MyNavBar />
      <AllProducts />
      <Footer />
    </>
  );
};

export default Home;
