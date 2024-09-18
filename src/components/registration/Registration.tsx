import { headers } from "next/headers";
import React from "react";
import RegistrationScreen from "./teacher/Registration.screen";
import StudentRegis from "./student/Student";

const Registration = async () => {
  const header = headers();
  const role = header.get("role");

  return (
    <div className="p-2">
      {role == "student" ? (
        <div>
          <StudentRegis />
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
