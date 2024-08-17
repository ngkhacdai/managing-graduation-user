import React from "react";
import TeacherContent from "./TeacherContent";
import Statistic from "./Statistic";

const TeacherScreen = ({ projectData }) => {
  return (
    <>
      <Statistic />
      <div className="min-h-screen p-2">
        <TeacherContent projectData={projectData} />
      </div>
    </>
  );
};

export default TeacherScreen;
