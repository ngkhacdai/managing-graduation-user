"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Banner from "./Banner";
import BodyHome from "./Body";
import FooterHome from "./Footer";

const HomeScreen = () => {
  const [isScroll, setIsscroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsscroll(true);
      } else {
        setIsscroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <Header isScroll={isScroll} />
      <Banner />
      <BodyHome />
      <FooterHome />
    </div>
  );
};

export default HomeScreen;
