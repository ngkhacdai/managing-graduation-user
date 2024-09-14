import React from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import ModalFilter from "./ModalFilter";
import { useSelector } from "react-redux";

const ListGraduation = dynamic(() => import("./ListGraduation"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const BodyHome = () => {
  const t = useTranslations("HomePage");
  const listProduct = useSelector((state) => state.home.listProject);

  return (
    <div className="flex flex-wrap w-full justify-center overflow-x-hidden bg-gray-50">
      <div className="w-full md:w-5/6 pt-2">
        {/* <div className="w-full p-2  rounded-lg shadow-md my-2 bg-white">
          <ListProjectHightPoint />
        </div> */}
        <div className="w-full p-2  rounded-lg shadow-md bg-white mt-5 mb-2">
          <div className="flex justify-between">
            <p className="text-2xl font-bold text-gray-800 mb-4">
              {t("titleListProduct")}
            </p>
            <ModalFilter />
          </div>
          {/* <div>
            <p className="my-2 font-bold text-xl">Newly updated project</p>
          </div> */}
          <ListGraduation listProduct={listProduct} />
        </div>
      </div>
    </div>
  );
};

export default BodyHome;
