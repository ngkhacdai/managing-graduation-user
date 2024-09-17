"use client";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { useTranslations } from "next-intl";
import { Button } from "antd";
import { usePathname, useRouter } from "next/navigation";

const Menu = () => {
  const router = useRouter();
  const t = useTranslations("HomePage");
  const pathName = usePathname();

  // Determine the current language
  const currentLang = pathName.split("/")[1];
  const isEnglish = currentLang === "en";

  // Handle toggle
  const handleToggle = () => {
    const newLang = isEnglish ? "vi" : "en";
    const getPath = pathName.slice(3);
    router.push(`/${newLang}${getPath}`);
  };

  return (
    <div
      className={`w-full select-none bg-white sticky top-0 z-10 border-b-2 drop-shadow-lg`}
    >
      <div
        className={`flex w-full md:w-5/6  mx-auto px-4 justify-between items-center `}
      >
        <div className="flex items-center ">
          <Link href={`/${currentLang}`}>
            <img alt="logo" className="w-16 h-16" src={logo.src} />
          </Link>
          <Link href={`/${currentLang}`}>
            <Button className="font-semibold text-lg" type="text">
              Home
            </Button>
          </Link>
          <Link href={`/${currentLang}/public/project`}>
            <Button className="font-semibold text-lg" type="text">
              Project
            </Button>
          </Link>
          <Link href={`/${currentLang}/public/contact`}>
            <Button className="font-semibold text-lg" type="text">
              Contact
            </Button>
          </Link>
        </div>
        <div className="flex items-center">
          {/* Language Toggle */}
          <Button
            type="text"
            className={`mx-2 font-semibold text-lg `}
            onClick={handleToggle}
          >
            {isEnglish ? "EN" : "VI"}
          </Button>

          <Link href={`/${currentLang}/login`}>
            <Button
              type="text"
              className={`font-semibold mx-2 text-lg hover:text-black `}
            >
              {t("Login")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
