"use client";
import React from "react";
import TableProject from "./TableProject";

const ProjectScreen = ({ projectData }) => {
  return (
    <div className="p-2">
      <TableProject projectData={projectData} />
    </div>
  );
};

export default ProjectScreen;
