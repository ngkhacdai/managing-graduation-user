import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { Button } from "antd";

const TeacherNavBar = () => {
  return (
    <div className="sticky top-0 z-10 border-b-2 border-inherit drop-shadow-lg bg-white opacity-85 flex justify-between items-center">
      <Link href="/">
        <img className="w-16 h-16" src={logo.src} alt="" />
      </Link>
      <Button type="text">Log out</Button>
    </div>
  );
};

export default TeacherNavBar;
