import { headers } from "next/headers";
import React from "react";
import FormProfile from "./teacher/FormProfile";
import FormStudent from "./student/FormStudent";

const ProfileComponent = () => {
  const role = headers().get("role");
  return (
    <div className="p-2">
      <p className="text-xl font-bold">Your Profile</p>
      {role === "teacher" ? <FormProfile /> : <FormStudent />}
    </div>
  );
};

export default ProfileComponent;
