import { headers } from "next/headers";
import React from "react";
import FormProfile from "./teacher/FormProfile";
import FormStudent from "./student/FormStudent";
import { getStudentProfile } from "@/api/Student";
import { getAllBranch } from "@/api/Branch";
import { getTeacherProfile } from "@/api/Teacher";

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
        <FormProfile dataProfile={dataProfile} />
      ) : (
        <FormStudent dataProfile={dataProfile} />
      )}
    </div>
  );
};

export default ProfileComponent;
