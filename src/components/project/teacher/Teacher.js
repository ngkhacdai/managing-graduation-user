import React from "react";
import TeacherScreen from "./Teacher.screen";
import { headers } from "next/headers";
import { getListProjectByMentor } from "@/api/Project";

const TeacherComponent = async () => {
  const projectData = await getListProjectByMentor();

  return (
    <div>
      <TeacherScreen projectData={projectData} />
    </div>
  );
};

export default TeacherComponent;
