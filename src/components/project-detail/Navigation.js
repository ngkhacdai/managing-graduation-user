"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const Navigation = () => {
  const searchParams = useSearchParams();
  return (
    <div className="py-3 px-7 bg-blue-700">
      <p className="font-bold text-white text-lg">
        Project: {searchParams.get("projectName")}
      </p>
    </div>
  );
};

export default Navigation;
