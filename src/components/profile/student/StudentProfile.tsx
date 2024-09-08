"use client";
import React from "react";
import FormStudent from "./FormStudent";
import { useTranslations } from "next-intl";

const StudentProfile = ({ dataProfile }) => {
  const t = useTranslations("Profile");
  return (
    <>
      <p className="font-semibold text-xl text-zinc-500 m-2">
        {t("yourProfile")}
      </p>

      <div className="md:w-1/2 w-full mx-auto">
        <FormStudent dataProfile={dataProfile} />
      </div>
    </>
  );
};

export default StudentProfile;
