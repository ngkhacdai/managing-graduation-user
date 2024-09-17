"use client";
import React, { useEffect } from "react";
import FilterTeacher from "./FilterTeacher";
import TableTeacher from "./TableTeacher";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchListSession } from "@/redux/slices/SignUpSlice";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Tooltip } from "antd";
const SignUpScreen = ({ listBranch }) => {
  const t = useTranslations("SignUp");
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchListSession());
  }, []);
  return (
    <div className="p-2">
      <div className="flex gap-2 items-center">
        <Tooltip title="Back to list registrations">
          <Link href={`/${pathName.split("/")[1]}/registration`}>
            <Button type="text">
              <FaArrowLeft size={18} />
            </Button>
          </Link>
        </Tooltip>
        <p className="py-2 text-xl font-semibold text-zinc-500">{t("title")}</p>
      </div>
      <FilterTeacher listBranch={listBranch} />
      <TableTeacher listBranch={listBranch} />
    </div>
  );
};

export default SignUpScreen;
