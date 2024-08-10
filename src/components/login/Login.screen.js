"use client";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import loginBackgroubd from "@/assets/login_bg.jpg";
import logo from "@/assets/logo.png";
const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const changeForm = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="w-5/6 h-screen flex mx-auto items-center justify-center">
      <div className="flex border-2 h-5/6  border-inherit rounded-xl shadow-lg">
        <div className="w-full md:w-1/3 flex mx-auto items-center justify-center">
          <div className="mx-auto">
            <div className="flex justify-center items-center">
              <img className="w-16 h-16" src={logo.src} />
            </div>
            {isLogin ? (
              <LoginForm changeForm={changeForm} />
            ) : (
              <ForgotPasswordForm changeForm={changeForm} />
            )}
          </div>
        </div>
        <img
          className="w-2/3 md:block hidden rounded-r-xl"
          src={loginBackgroubd.src}
        />
      </div>
    </div>
  );
};

export default LoginScreen;
