import React from "react";
import SideBarScreen from "./SideBar.screen";

const SideBar = async () => {
  const fakeDataProfile = {
    avatar: "https://cdn.jwplayer.com/v2/media/cJHxScqU/poster.jpg?width=720",
  };

  return <SideBarScreen userData={fakeDataProfile} />;
};

export default SideBar;
