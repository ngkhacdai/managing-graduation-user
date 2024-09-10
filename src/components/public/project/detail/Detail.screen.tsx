"use client";
import React from "react";
import LoadingPdf from "./LoadingPdf";
import ProjectInformation from "./ProjectInformation";

const DetailScreen = ({ data }) => {
  console.log(data);

  return (
    <div className="flex flex-col gap-2 mt-2 w-full md:w-3/4 mx-auto">
      <p className="text-2xl font-bold">Project information</p>

      <div className="p-2 border-2 h-full rounded-lg w-full">
        <ProjectInformation data={data} />
      </div>
      <div className="w-full  border-2 max-h-screen">
        <LoadingPdf filePdf={data.filePdf} />
      </div>
    </div>
  );
};

export default DetailScreen;
