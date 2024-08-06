"use client";
import { Button } from "antd";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Navigation = ({ role }) => {
  const searchParams = useSearchParams();
  return (
    <>
      <div className=" px-7 flex items-center justify-between bg-blue-700">
        <p className="py-2 font-bold text-white text-lg">
          Project: {searchParams.get("projectName")}
        </p>
      </div>
    </>
  );
};

export default Navigation;
