"use client";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getInforUser } from "@/redux/slices/UserInforSlice";
import Banner from "./Banner";
import FooterHome from "../Footer";
const ContactScreen = ({ role }) => {
  const [isScroll, setIsscroll] = useState(false);
  const userInfor = useSelector(
    (state: RootState) => state.userInfor.userInfor
  );
  const dispatch = useDispatch<AppDispatch>();
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
      <div className="">
        <Header isScroll={isScroll} userInfor={userInfor} />
      </div>
      <Banner />
      <FooterHome />
    </div>
  );
};

export default ContactScreen;
