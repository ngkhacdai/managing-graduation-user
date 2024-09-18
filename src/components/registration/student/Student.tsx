import { getProjectDetail } from "@/api/Project";
import React from "react";
import RegistrationScreenStudent from "./Registration.screen";

const StudentRegis = async () => {
  let project = await getProjectDetail();
  return (
    <div>
      <RegistrationScreenStudent project={project} />
    </div>
  );
};

export default StudentRegis;
