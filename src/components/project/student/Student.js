import React from "react";
import ProjectScreen from "./Project.screen";
const StudentComponent = () => {
  const fakeStatus = () => {
    return ["processing", "Finished", "Failed"][Math.floor(Math.random() * 3)];
  };
  const fakeProjectData = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    projectName: `project-${index}`,
    studentName: `student`,
    teacherName: `teacher-${index}`,
    status: "Failed",
  }));
  return (
    <div>
      <ProjectScreen projectData={fakeProjectData} />
    </div>
  );
};

export default StudentComponent;
