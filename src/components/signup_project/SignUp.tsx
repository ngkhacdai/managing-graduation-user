import React from "react";
import SignUpScreen from "./SignUp.screen";
import { getAllBranch } from "@/api/Branch";
import { getAllTeacher } from "@/api/Teacher";

const SignUp = async () => {
  const listBranch = await getAllBranch();
  const listTeacher = await getAllTeacher();
  return (
    <SignUpScreen
      listBranch={listBranch?.data || []}
      listTeacher={listTeacher?.data || []}
    />
  );
};

export default SignUp;
