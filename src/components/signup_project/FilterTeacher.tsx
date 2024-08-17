import { Form, Input, Select } from "antd";
import { useTranslations } from "next-intl";
import React from "react";

const FilterTeacher = ({ listBranch }) => {
  const t = useTranslations("SignUp");
  const options = [
    ...listBranch.map((item) => {
      return { value: item.id.toString(), label: item.name };
    }),
  ];

  const handleChangeBranch = (value: string) => {
    console.log(`selected ${value}`);
  };
  const handleChangeTeacher = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="py-2">
      <div className="flex md:items-center flex-col md:flex-row">
        <div className="flex p-2 md:items-center md:flex-row flex-col">
          <Select
            mode="tags"
            placeholder={t("slBranch")}
            // maxCount={1}
            className="container md:min-w-56 md:max-w-96"
            onChange={handleChangeBranch}
            options={options}
          />
        </div>
        <div className="flex p-2 md:items-center md:flex-row flex-col">
          <Select
            placeholder={t("findTeacher")}
            mode="multiple"
            // maxCount={1}
            className="container md:min-w-56"
            onChange={handleChangeTeacher}
          />
        </div>
        {/* <div className="flex p-2 items-center">
          <p className="pr-2 w-10 xl:w-max">Search teacher</p>
          <Input className="max-w-40" />
        </div> */}
      </div>
    </div>
  );
};

export default FilterTeacher;
