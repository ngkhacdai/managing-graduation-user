"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Banner from "./Banner";
import BodyHome from "./Body";
import FooterHome from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { getInforUser } from "@/redux/slices/UserInforSlice";

const HomeScreen = ({ role }) => {
  const [isScroll, setIsscroll] = useState(false);
  const userInfor = useSelector((state) => state.userInfor.userInfor);
  const dispatch = useDispatch();
  useEffect(() => {
    if (role && !userInfor) {
      dispatch(getInforUser());
    }
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
      <Header userInfor={userInfor} isScroll={isScroll} />
      <Banner />
      <BodyHome s />
      <FooterHome />
    </div>
  );
};

export default HomeScreen;
