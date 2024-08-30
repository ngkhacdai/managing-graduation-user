import { Form, Input, Select } from "antd";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import ModalBranch from "./ModalBranch";
import Search from "antd/es/input/Search";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { filterTeacher, saveSearch } from "@/redux/slices/SignUpSlice";

const FilterTeacher = ({ listBranch }) => {
  const t = useTranslations("SignUp");
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState({ branch: [] });
  const [searchText, setSearchText] = useState("");
  const handleSearchTeacher = (value: string) => {
    dispatch(saveSearch(value));
    const form = {
      teacherName: value,
      branch: filter.branch,
    };
    dispatch(filterTeacher(form));
  };
  return (
    <div className="py-2">
      <div className="flex md:items-center flex-col md:flex-row">
        <div className="flex p-2 md:items-center md:flex-row flex-col">
          <Search
            placeholder={t("findTeacher")}
            className="container md:min-w-56"
            onSearch={handleSearchTeacher}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="flex p-2 md:items-center md:flex-row flex-col">
          <ModalBranch
            filter={filter}
            setFilter={(value) => setFilter(value)}
            searchText={searchText}
            listBranch={listBranch}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterTeacher;
