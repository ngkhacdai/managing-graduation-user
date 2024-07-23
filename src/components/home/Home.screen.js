"use client";
import React from "react";
import Header from "./Header";
import Banner from "./Banner";
import BodyHome from "./Body";
import FooterHome from "./Footer";

const HomeScreen = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Header />
      <Banner />
      <BodyHome />
      <FooterHome />
    </div>
  );
};

export default HomeScreen;
