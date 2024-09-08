"use client";
import React from "react";
import { useTranslations } from "next-intl";
import FormProfile from "./FormProfile";

const TeacherProfile = ({ dataProfile }) => {
  const t = useTranslations("Profile");
  return (
    <>
      <p className="font-semibold text-xl text-zinc-500 m-2">
        {t("yourProfile")}
      </p>
      <div className="md:w-1/2 w-full mx-auto">
        <FormProfile dataProfile={dataProfile} />
      </div>
    </>
  );
};

export default TeacherProfile;
