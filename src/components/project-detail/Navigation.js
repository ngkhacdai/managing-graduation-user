"use client";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
const { Header, Content, Footer } = Layout;
import React from "react";

const Navigation = ({ projectName }) => {
  return (
    <div className="py-3 px-7 bg-blue-700">
      <p className="font-bold text-white text-lg">{projectName}</p>
    </div>
  );
};

export default Navigation;
