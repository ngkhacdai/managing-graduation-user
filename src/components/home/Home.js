import React from "react";
import HomeScreen from "./Home.screen";
import { headers } from "next/headers";

const HomeComponent = () => {
  const header = headers();
  const role = header.get("role");
  return <HomeScreen role={role} />;
};

export default HomeComponent;
