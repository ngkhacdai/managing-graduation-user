"use client";
import { Button } from "antd";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveFile } from "@/redux/slices/ProjectDetailSlice";
const Navigation = ({ role }) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const saveFileJson = () => {
    dispatch(saveFile());
  };
  return (
    <>
      <div className=" px-7 flex items-center justify-between bg-blue-700">
        <p className="py-2 font-bold text-white text-lg">
          Project: {searchParams.get("projectName")}
        </p>
        {/* <p className="py-2 font-bold text-white text-lg">
          Student Name: {searchParams.get("studentName")}
        </p>
        <p className="py-2 font-bold text-white text-lg">
          Teacher Name: {searchParams.get("teacherName")}
        </p> */}
        <Button onClick={saveFileJson}>Save</Button>
      </div>
    </>
  );
};

export default Navigation;
