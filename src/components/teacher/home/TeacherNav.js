import { Button } from "antd";
import React from "react";

const TeacherNav = () => {
  return (
    <div className="flex h-dvh flex-col pt-5 border-r-2 border-inherit items-center">
      <img className="bg-red-600 w-28 h-28" src="" alt="avata" />
      <div className="flex m-2">
        <Button className="mr-2">Home</Button>
        <Button>Library</Button>
      </div>
    </div>
  );
};

export default TeacherNav;
