"use client";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { Button, message } from "antd";
import { logoutApi } from "@/api/Access";
import { useRouter } from "next/navigation";

const NavBarUser = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const logout = async () => {
    const result = await logoutApi();
    if (result.success) {
      messageApi.success("Successfully logged out");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      return;
    }
    messageApi.error("Failed to log out");
  };
  return (
    <div>
      <div className=" border-b-2 border-inherit drop-shadow-lg bg-white opacity-85 flex justify-between items-center">
        {contextHolder}
        <Link href="/">
          <img className="w-16 h-16" src={logo.src} alt="" />
        </Link>
        <Button onClick={logout} type="text">
          Log out
        </Button>
      </div>
      {children}
    </div>
  );
};

export default NavBarUser;
