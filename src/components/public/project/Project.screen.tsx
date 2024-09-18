"use client";
import { getInforUser } from "@/redux/slices/UserInforSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import FooterHome from "../Footer";

const ProjectScreen = ({ role }) => {
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
      <div className="min-h-screen flex flex-col">
        <Header isScroll={isScroll} userInfor={userInfor} />
        <div className="flex-grow"></div>
        <FooterHome />
      </div>
    </div>
  );
};

export default ProjectScreen;
