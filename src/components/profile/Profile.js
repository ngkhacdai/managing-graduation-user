import { headers } from "next/headers";
import React from "react";
import FormProfile from "./teacher/FormProfile";
import FormStudent from "./student/FormStudent";

const ProfileComponent = () => {
  const role = headers().get("role");
  return (
    <div className="p-2">
      <p className="font-semibold text-xl text-zinc-500 m-2">Your Profile</p>
      {role === "teacher" ? <FormProfile /> : <FormStudent />}
    </div>
  );
};

export default ProfileComponent;
