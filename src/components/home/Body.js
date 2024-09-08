import React, { useCallback, useEffect } from "react";
import NavFillter from "./NavFillter";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import ModalFilter from "./ModalFilter";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { getListProject } from "@/redux/slices/HomeSlice";
import debounce from "lodash.debounce";

const ListGraduation = dynamic(() => import("./ListGraduation"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const BodyHome = () => {
  const t = useTranslations("HomePage");
  const loading = useSelector((state) => state.home.loading);
  const listProduct = useSelector((state) => state.home.listProject);

  const dispatch = useDispatch();
  const debounceListProject = useCallback(
    debounce(() => {
      dispatch(getListProject());
    }, 300),
    []
  );
  useEffect(() => {
    debounceListProject();
  }, []);
  return (
    <div className="flex flex-wrap w-full justify-center overflow-x-hidden">
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
