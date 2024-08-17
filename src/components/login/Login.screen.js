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
    <div className="w-5/6 h-screen flex mx-auto items-center justify-center">
      <div className="flex border-2 h-5/6  border-inherit rounded-xl shadow-lg">
        <div className="w-full md:w-1/3 flex mx-auto items-center justify-center">
          <div className="mx-auto">
            <div className="flex justify-center items-center">
              <img alt="" className="w-16 h-16" src={logo.src} />
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
