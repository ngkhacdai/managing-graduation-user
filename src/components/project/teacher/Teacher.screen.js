"use client";
import React, { useEffect } from "react";
import TeacherContent from "./TeacherContent";
import Statistic from "./Statistic";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/ProjectDetailSlice";

const TeacherScreen = ({ projectData }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, []);
  return (
    <>
      <Statistic data={projectData.data1} />
      <div className=" p-2">
        <TeacherContent projectData={projectData.data2} />
      </div>
    </>
  );
};

export default TeacherScreen;
