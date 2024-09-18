"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import LoadingFile from "./LoadingFile";
import RegisInformation from "./RegisInformation";

const DetailScreen = ({ detail }) => {
  const pathName = usePathname();
  console.log(detail);

  return (
    <div className="p-2">
      <Link href={`/${pathName.split("/")[1]}/registration`}>
        <IoMdArrowBack size={24} />
      </Link>
      {detail && (
        <div className="flex mb-2 lg:w-2/3 w-full mx-auto items-center gap-2 flex-col">
          <RegisInformation detail={detail} />
          <div className="border-2 py-2 text-center w-full rounded-t-lg">
            <p className="text-xl font-bold">File detail</p>
            <LoadingFile url={detail.file_attachment} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailScreen;
