import SignUp from "@/components/signup_project/SignUp";
import React from "react";
import ProjectScreen from "./Project.screen";
import { getProjectDetail } from "@/api/Project";
const StudentComponent = async () => {
  let project = await getProjectDetail();

  if (!project) {
    return <SignUp />;
  } else {
    return <ProjectScreen project={project} />;
  }
};

export default StudentComponent;
