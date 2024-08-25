import React from "react";
import NavFillter from "./NavFillter";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import ModalFilter from "./ModalFilter";

const ListGraduation = dynamic(() => import("./ListGraduation"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const BodyHome = () => {
  const t = useTranslations("HomePage");
  const randomBranch = () => {
    const branches = ["CNTT", "DTVT", "CK", "TC", "TT", "KHMT"];
    return branches[Math.floor(Math.random() * branches.length)];
  };

  const listProduct = Array.from({ length: 21 }, (_, index) => ({
    id: index,
    product_name: `Tên product ${index}`,
    name: `Nguyễn Văn ${index}`,
    msv: `MSV${index}`,
    branch: `${randomBranch()}`,
    instructors: `Giảng viên ${Math.floor(Math.random() * 10)}`,
    point: `${Math.floor(Math.random() * 10) + 1}`,
  }));

  return (
    <div className="flex flex-wrap w-full justify-center overflow-x-hidden">
      {/* <div className="w-full md:w-1/4 p-2">
        <NavFillter />
      </div> */}
      <div className="w-full md:w-5/6 pt-2">
        <div className="w-full p-2 bg-gray-50 rounded-lg shadow-md">
          <div className="flex justify-between">
            <p className="text-2xl font-bold text-gray-800 mb-4">
              {t("titleListProduct")}
            </p>
            <ModalFilter />
          </div>
          <ListGraduation listProduct={listProduct} />
        </div>
      </div>
    </div>
  );
};

export default BodyHome;
