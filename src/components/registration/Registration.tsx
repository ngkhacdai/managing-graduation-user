import { headers } from "next/headers";
import React from "react";
import RegistrationScreen from "./teacher/Registration.screen";
import { redirect } from "next/navigation";
import RegistrationScreenStudent from "./student/Registration.screen";
import { teacherGetListRegis } from "@/api/Teacher";

const Registration = async () => {
  const header = headers();
  const role = header.get("role");

  return (
    <div className="p-2">
      {role == "student" ? (
        <div>
          <RegistrationScreenStudent />
        </div>
      ) : (
        <div>
          <RegistrationScreen />
        </div>
      )}
    </div>
  );
};

export default Registration;
