import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { useTranslations } from "next-intl";
import { Button } from "antd";
import { usePathname, useRouter } from "next/navigation";

const Header = ({ isScroll }) => {
  const router = useRouter();
  const t = useTranslations("HomePage");
  const pathName = usePathname();

  // Determine the current language
  const currentLang = pathName.split("/")[1];
  const isEnglish = currentLang === "en";

  // Handle toggle
  const handleToggle = () => {
    const newLang = isEnglish ? "vi" : "en";
    router.push(`/${newLang}`);
  };

  return (
    <div
      className={`w-full select-none fixed top-0 z-10 pt-5 transition-all duration-300 ${
        isScroll ? "bg-white -translate-y-5" : "bg-transparent"
      }`}
    >
      <div
        className={`flex w-full md:w-5/6 bg-white mx-auto px-4 justify-between items-center ${
          !isScroll && "border-2 shadow-lg rounded-xl"
        }`}
      >
        <div className="flex items-center ">
          <Link href="/">
            <img alt="logo" className="w-16 h-16" src={logo.src} />
          </Link>
          <Link href={`/${currentLang}/`}>
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

export default Header;
