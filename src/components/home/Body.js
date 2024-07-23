import React from "react";
import NavFillter from "./NavFillter";
import dynamic from "next/dynamic";

const ListGraduation = dynamic(() => import("./ListGraduation"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const BodyHome = () => {
  const randomBranch = () => {
    const branches = ["CNTT", "DTVT", "CK", "TC", "TT", "KHMT"];
    return branches[Math.floor(Math.random() * branches.length)];
  };

  const listProduct = Array.from({ length: 50 }, (_, index) => ({
    id: index,
    product_name: `Tên product ${index}`,
    name: `Nguyễn Văn ${index}`,
    msv: `MSV${index}`,
    branch: `${randomBranch()}`,
    instructors: `Giảng viên ${Math.floor(Math.random() * 10)}`,
    point: `${Math.floor(Math.random() * 10) + 1}`,
  }));

  return (
    <div className="flex w-full">
      <NavFillter />
      <ListGraduation listProduct={listProduct} />
    </div>
  );
};

export default BodyHome;
