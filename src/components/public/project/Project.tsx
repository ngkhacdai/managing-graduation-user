import React from "react";
import ProjectScreen from "./Project.screen";
import { headers } from "next/headers";

const Project = () => {
  const header = headers();
  const role = header.get("role");
  return (
    <div>
      <ProjectScreen role={role} />
    </div>
  );
};

export default Project;
