import { Form, Input, Select } from "antd";
import React from "react";

const FilterTeacher = ({ listBranch }) => {
  const options = [
    { value: "all", label: "All" },
    ...listBranch.map((item) => {
      return { value: item, label: item };
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
      <div className="flex items-center flex-col xl:flex-row">
        <div className="flex p-2 items-center">
          <p className="pr-2">Select branch</p>
          <Select
            mode="tags"
            defaultValue="all"
            maxCount={1}
            className="w-40"
            onChange={handleChangeBranch}
            options={options}
          />
        </div>
        <div className="flex p-2 items-center">
          <p className="pr-2">Find teacher</p>
          <Select
            defaultValue="all"
            mode="multiple"
            maxCount={1}
            className="w-40"
            onChange={handleChangeTeacher}
            options={options}
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
