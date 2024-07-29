import { headers } from "next/headers";
import React from "react";
import FormProfile from "./teacher/FormProfile";

const ProfileComponent = () => {
  const role = headers().get("role");
  return (
    <div className="p-2">
      <p className="text-xl font-bold">Your Profile</p>
      {role === "teacher" ? <FormProfile /> : <p>student</p>}
    </div>
  );
};

export default ProfileComponent;
