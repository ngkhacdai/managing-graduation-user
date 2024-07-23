import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <img className="w-16 h-16" src="" />
      <Link className="hover:text-blue-300" href={"/login"}>
        Login
      </Link>
    </div>
  );
};

export default Header;
