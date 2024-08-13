import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { useTranslations } from "next-intl";
import { Select } from "antd";
import { usePathname, useRouter } from "next/navigation";
const Header = () => {
  const router = useRouter();
  const t = useTranslations("HomePage");
  const pathName = usePathname();
  return (
    <div className="flex justify-between items-center">
      <Link href={"/"}>
        <img className="w-16 h-16" src={logo.src} />
      </Link>
      <div className="flex items-center">
        <Select
          className="mr-2 !w-20 sm:!w-28"
          defaultValue={
            pathName.split("/")[1] == "en" ? "English" : "Tiếng Việt"
          }
          onChange={(value) => {
            console.log(`/${value}`);
            router.push(`/${value}`);
          }}
          options={[
            { value: "en", label: t("English") },
            { value: "vi", label: t("Vietnamese") },
          ]}
        />
        <Link className="hover:text-blue-300" href={"/login"}>
          {t("Login")}
        </Link>
      </div>
    </div>
  );
};

export default Header;
