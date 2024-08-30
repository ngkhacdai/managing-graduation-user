import React from "react";
import SignUpScreen from "./SignUp.screen";
import { getAllBranch } from "@/api/Branch";

const SignUp = async () => {
  const listBranch = await getAllBranch();
  return <SignUpScreen listBranch={listBranch?.data || []} />;
};

export default SignUp;
