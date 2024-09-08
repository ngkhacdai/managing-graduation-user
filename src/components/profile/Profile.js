import { headers } from "next/headers";
import React from "react";
import FormProfile from "./teacher/FormProfile";
import FormStudent from "./student/FormStudent";
import { getStudentProfile } from "@/api/Student";
import { getTeacherProfile } from "@/api/Teacher";
import StudentProfile from "./student/StudentProfile";
import TeacherProfile from "./teacher/TeacherProfile";

const ProfileComponent = async () => {
  const role = headers().get("role");

  let dataProfile;
  try {
    if (role === "teacher") {
      const response = await getTeacherProfile();
      dataProfile = response;
    } else {
      const response = await getStudentProfile();
      dataProfile = response;
    }
  } catch (error) {
    console.log("error fetch get profile", error);
    dataProfile = [];
  }
  return (
    <div className="p-2">
      {role === "teacher" ? (
        <TeacherProfile dataProfile={dataProfile} />
      ) : (
        <StudentProfile dataProfile={dataProfile} />
      )}
    </div>
  );
};

export default ProfileComponent;
