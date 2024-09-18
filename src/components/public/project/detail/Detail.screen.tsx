"use client";
import React, { useEffect, useState } from "react";
import LoadingPdf from "./LoadingPdf";
import ProjectInformation from "./ProjectInformation";
import Header from "../../Header";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getInforUser } from "@/redux/slices/UserInforSlice";
import FooterHome from "../../Footer";

const DetailScreen = ({ data, role }) => {
  const [isScroll, setIsscroll] = useState(false);
  const userInfor = useSelector(
    (state: RootState) => state.userInfor.userInfor
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (role && !userInfor) {
      dispatch(getInforUser());
    }
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsscroll(true);
      } else {
        setIsscroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <Header isScroll={true} userInfor={userInfor} />
      <div className="flex flex-col gap-2 mt-24 w-full md:w-3/4 mx-auto">
        <p className="text-2xl font-bold">Project information</p>

        <div className="p-2 border-2 h-full rounded-lg w-full">
          <ProjectInformation data={data} />
        </div>
        <div className="w-full  border-2">
          <LoadingPdf filePdf={data.filePdf} />
        </div>
      </div>
      <div className="mt-2">
        <FooterHome />
      </div>
    </div>
  );
};

export default DetailScreen;
