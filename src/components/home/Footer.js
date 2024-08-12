import React from "react";
import logo from "@/assets/logo.png";
import { useTranslations } from "next-intl";
const FooterHome = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="w-full py-2 bg-gray-300 flex justify-center flex-col items-center">
      <img src={logo.src} className="w-16 h-16" />
      <p className="text-2xl font-bold">Graduation project</p>
      <p className="text-lg max-w-[32rem] text-center">{t("description")}</p>
    </div>
  );
};

export default FooterHome;
