"use client";
import React from "react";
import FilterTeacher from "./FilterTeacher";
import TableTeacher from "./TableTeacher";
import { useTranslations } from "next-intl";
const SignUpScreen = ({ listBranch }) => {
  const t = useTranslations("SignUp");
  return (
    <div className="p-2">
      <p className="py-2 text-xl font-semibold text-zinc-500">{t("title")}</p>
      <FilterTeacher listBranch={listBranch} />
      <TableTeacher listBranch={listBranch} />
    </div>
  );
};

export default SignUpScreen;
