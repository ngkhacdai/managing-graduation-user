import React from "react";
import TeacherContent from "./TeacherContent";

const TeacherScreen = ({ projectData }) => {
  return (
    <>
      <div className="min-h-screen">
        <TeacherContent projectData={projectData} />
      </div>
    </>
  );
};

export default TeacherScreen;
