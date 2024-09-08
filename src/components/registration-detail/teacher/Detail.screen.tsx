"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import StudentInformation from "./StudentInformation";
import ProjectInformation from "./ProjectInformation";
import LoadingFile from "./LoadingFile";

const DetailScreen = ({ detail }) => {
  const pathName = usePathname();

  return (
    <div className="p-2">
      <Link href={`/${pathName.split("/")[1]}/registration`}>
        <IoMdArrowBack size={24} />
      </Link>
      {detail && (
        <div className="flex  md:w-2/3 w-full mx-auto items-center gap-2 flex-col">
          <StudentInformation detail={detail.studentProfileView} />
          <ProjectInformation detail={detail} />
          <p className="text-xl font-bold">File detail</p>
          <LoadingFile url={detail.attachmentFile} />
        </div>
      )}
    </div>
  );
};

export default DetailScreen;
