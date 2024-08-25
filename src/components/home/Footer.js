import React from "react";
import logo from "@/assets/logo.png";
import { useTranslations } from "next-intl";
import Link from "next/link";

const FooterHome = () => {
  const t = useTranslations("HomePage");

  return (
    <div className="w-full md:px-20 border-2 drop-shadow-lg py-2 mt-2 flex justify-between items-center">
      <Link href="/">
        <img
          alt="Graduation Project Logo"
          src={logo.src}
          className="w-20 h-20 mb-2"
        />
      </Link>
      <p>{t("made")}</p>
    </div>
  );
};

export default FooterHome;
