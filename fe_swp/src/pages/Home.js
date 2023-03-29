import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import "../styles/Home.css";
const Home = () => {
  return (
    <>
      <div
        className='main-content'
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <Header></Header>
        <Navigation />
      </div>
    </>
  );
};

export default Home;
