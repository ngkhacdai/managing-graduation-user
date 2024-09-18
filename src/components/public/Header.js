import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { useTranslations } from "next-intl";
import { Button } from "antd";
import { usePathname, useRouter } from "next/navigation";
import Search from "antd/es/input/Search";

const Header = ({ isScroll, userInfor }) => {
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

  // Check if the current path matches the link
  const isActive = (path) => pathName === path;

  return (
    <div
      className={`w-full select-none fixed  top-0 z-10 pt-5 transition-all duration-300 ${
        isScroll ? " drop-shadow-lg bg-white -translate-y-5 " : "bg-transparent"
      }`}
    >
      <div
        className={`flex w-full md:w-5/6 bg-white mx-auto px-4 justify-between items-center ${
          !isScroll && "border-2 shadow-lg rounded-xl"
        }`}
      >
        <div className="flex items-center gap-2">
          <img alt="logo" className="w-16 h-16" src={logo.src} />
          <Link href={`/${currentLang}/`}>
            <Button
              className={`font-semibold hover:!text-blue-300 text-lg ${
                isActive(`/${currentLang}`)
                  ? "text-blue-500 bg bg-zinc-100"
                  : ""
              }`}
              type="text"
            >
              Home
            </Button>
          </Link>
          <Link href={`/${currentLang}/public/project`}>
            <Button
              className={`font-semibold text-lg hover:!text-blue-300 ${
                isActive(`/${currentLang}/public/project`)
                  ? "text-blue-500  bg-zinc-100"
                  : ""
              }`}
              type="text"
            >
              Projects
            </Button>
          </Link>
          <Link href={`/${currentLang}/public/contact`}>
            <Button
              className={`font-semibold hover:!text-blue-300 text-lg ${
                isActive(`/${currentLang}/public/contact`)
                  ? "text-blue-500  bg-zinc-100"
                  : ""
              }`}
              type="text"
            >
              Contact
            </Button>
          </Link>
        </div>
        {pathName === `/${currentLang}/public/project` && (
          <div className="md:w-1/3">
            <Search placeholder="Search project in here" />
          </div>
        )}

        <div className="flex items-center">
          <Button
            type="text"
            className={`mx-2 font-semibold text-lg `}
            onClick={handleToggle}
          >
            {isEnglish ? "EN" : "VI"}
          </Button>
          {!userInfor ? (
            <Link href={`/${currentLang}/login`}>
              <Button
                type="text"
                className={`font-semibold mx-2 text-lg hover:text-black ${
                  isActive(`/${currentLang}/login`) ? "text-blue-500" : ""
                }`}
              >
                {t("Login")}
              </Button>
            </Link>
          ) : (
            <Link href={`/${currentLang}/project`}>
              <Button
                type="text"
                className={`font-semibold mx-2 text-lg hover:text-black ${
                  isActive(`/${currentLang}/project`) ? "text-blue-500" : ""
                }`}
              >
                {userInfor}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
