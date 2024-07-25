import React from "react";
import logo from "@/assets/logo.png";
const FooterHome = () => {
  return (
    <div className="w-full py-2 bg-gray-300 flex justify-center flex-col items-center">
      <img src={logo.src} className="w-16 h-16" />
      <p className="text-2xl font-bold">Graduation project</p>
      <p className="text-lg max-w-[32rem] text-center">
        The graduation project is a website where you can view projects
        published by students and complete tasks assigned by teachers, provided
        you are eligible for your own graduation project.
      </p>
    </div>
  );
};

export default FooterHome;
