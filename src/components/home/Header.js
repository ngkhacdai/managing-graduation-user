import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { useTranslations } from "next-intl";
const Header = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="flex justify-between items-center">
      <Link href={"/"}>
        <img className="w-16 h-16" src={logo.src} />
      </Link>
      <Link className="hover:text-blue-300" href={"/login"}>
        {t("Login")}
      </Link>
    </div>
  );
};

export default Header;
