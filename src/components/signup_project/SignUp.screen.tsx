"use client";
import React, { useEffect } from "react";
import FilterTeacher from "./FilterTeacher";
import TableTeacher from "./TableTeacher";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchListSession } from "@/redux/slices/SignUpSlice";
const SignUpScreen = ({ listBranch }) => {
  const t = useTranslations("SignUp");
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchListSession());
  }, []);
  return (
    <div className="p-2">
      <p className="py-2 text-xl font-semibold text-zinc-500">{t("title")}</p>
      <FilterTeacher listBranch={listBranch} />
      <TableTeacher listBranch={listBranch} />
    </div>
  );
};

export default SignUpScreen;
