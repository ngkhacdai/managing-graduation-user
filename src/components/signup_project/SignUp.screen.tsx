"use client";
import React from "react";
import FilterTeacher from "./FilterTeacher";
import TableTeacher from "./TableTeacher";
const SignUpScreen = ({ listBranch, listTeacher }) => {
  return (
    <div className="p-2">
      <p className="py-2 text-xl font-semibold text-zinc-500">
        Sign up project
      </p>
      <FilterTeacher listBranch={listBranch} />
      <TableTeacher listTeacher={listTeacher} />
    </div>
  );
};

export default SignUpScreen;
