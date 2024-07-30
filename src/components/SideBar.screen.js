"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button, Popover } from "antd";
import Link from "next/link";
const SideBarScreen = ({ userData }) => {
  const route = useRouter();

  const goToPage = (page) => {
    route.push(page);
  };
  return (
    <div className="flex h-full flex-col pt-5 border-r-2 border-inherit items-center">
      <Popover title={<p className="text-center">Show Profile</p>}>
        <Link href={"/profile"}>
          <img
            className=" w-28 h-28 cursor-pointer"
            src={userData.avatar}
            alt="avatar"
          />
        </Link>
      </Popover>
      <div className="flex m-2 flex-col lg:flex-row">
        <Button
          onClick={() => {
            goToPage("/project");
          }}
          className="m-2"
        >
          Home
        </Button>
        <Button className="m-2">Library</Button>
      </div>
    </div>
  );
};

export default SideBarScreen;
