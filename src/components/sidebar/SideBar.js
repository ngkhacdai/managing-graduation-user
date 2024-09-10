import React from "react";
// import SideBarScreen from "./SideBar.screen";
import { headers } from "next/headers";
import dynamic from "next/dynamic";
const SideBarScreen = dynamic(() => import("./SideBar.screen"), { ssr: false });
const SideBar = async ({ children }) => {
  const header = headers();
  const role = header.get("role");
  return (
    <div>
      <SideBarScreen role={role}>{children}</SideBarScreen>
    </div>
  );
};

export default SideBar;
