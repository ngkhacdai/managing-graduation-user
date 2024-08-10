import { headers } from "next/headers";
import React from "react";
import FormProfile from "./teacher/FormProfile";
import FormStudent from "./student/FormStudent";
import { getStudentProfile } from "@/api/Student";
import { getAllBranch } from "@/api/Branch";

const ProfileComponent = async () => {
  const role = headers().get("role");
  // const listBranch = await getAllBranch();
  // console.log(listBranch);

  let dataProfile;
  try {
    if (role === "teacher") {
      // const response = await getStudentProfile()
      // console.log(response);
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
      <p className="font-semibold text-xl text-zinc-500 m-2">Your Profile</p>
      {role === "teacher" ? (
        <FormProfile />
      ) : (
        <FormStudent dataProfile={dataProfile} />
      )}
    </div>
  );
};

export default ProfileComponent;
