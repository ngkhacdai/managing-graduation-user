import { headers } from "next/headers";
import React from "react";
import TeacherComponent from "./teacher/Teacher";

const ProjectComponent = () => {
  const headersList = headers();
  const role = headersList.get("role");
  return (
    <div>{role === "teacher" ? <TeacherComponent /> : <p>student</p>}</div>
  );
};

export default ProjectComponent;
