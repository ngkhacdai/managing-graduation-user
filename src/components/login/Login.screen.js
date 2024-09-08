"use client";
import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import loginBackgroubd from "@/assets/login_bg.jpg";
import logo from "@/assets/logo.png";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/ProjectDetailSlice";
const LoginScreen = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const changeForm = () => {
    setIsLogin(!isLogin);
  };
  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);
  return (
    <div className="w-screen h-screen flex mx-auto items-center justify-center">
      <div className="flex border-2 h-screen  border-inherit shadow-lg">
        <div className="w-full relative md:w-1/3 flex mx-auto items-center justify-center">
          <div className="mx-auto">
            <div className="flex justify-center items-center">
              <img alt="" className="w-24 h-24" src={logo.src} />
            </div>
            {isLogin ? (
              <LoginForm changeForm={changeForm} />
            ) : (
              <ForgotPasswordForm changeForm={changeForm} />
            )}
          </div>
        </div>
        <img
          alt=""
          className="w-2/3 md:block hidden rounded-r-xl"
          src={loginBackgroubd.src}
        />
      </div>
    </div>
  );
};

export default LoginScreen;
