import React from "react";
import TeacherNav from "./TeacherNav";
import TeacherContent from "./TeacherContent";
import TeacherNavBar from "../NavBar";

const TeacherScreen = () => {
  return (
    <>
      <div className="min-h-screen">
        <TeacherNavBar />
        <div className="flex">
          <div className="w-1/6">
            <TeacherNav />
          </div>
          <div className="w-5/6">
            <TeacherContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherScreen;
