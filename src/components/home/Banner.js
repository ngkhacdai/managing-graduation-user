import React from "react";
import banner from "@/assets/banner.jpg";
const Banner = () => {
  return (
    <div className="w-full h-96 overflow-hidden">
      <img className="w-full h-96" src={banner.src} alt="no img" />
    </div>
  );
};

export default Banner;
