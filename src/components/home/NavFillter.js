import React, { useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Checkbox, Input, Select, Space } from "antd";
import { useTranslations } from "next-intl";
const { Search } = Input;

const NavFillter = ({ listCkb = [] }) => {
  const t = useTranslations("HomePage");
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const suffix = <AudioOutlined style={{ fontSize: 16, color: "#1677ff" }} />;

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  return (
    <div className="w-full p-2">
      <Search
        className="h-10"
        placeholder={`${t("search input")}`}
        size="middle"
        suffix={suffix}
        onSearch={onSearch}
      />
      <Select
        defaultValue="All"
        onChange={handleChange}
        className="w-full"
        options={[
          { value: "All", label: "All" },
          { value: "Teacher", label: "Teacher" },
          { value: "Branch", label: "Branch" },
          { value: "Year", label: "Year" },
        ]}
      />
      <Checkbox.Group
        className="w-full flex flex-col max-w-full"
        onChange={onChange}
      >
        {listCkb?.map((item) => {
          return (
            <Checkbox key={item.id} value={item.value}>
              {item.label}
            </Checkbox>
          );
        })}
        <Checkbox className="line-clamp-1 flex max-w-56 container" value="A">
          AAAAAAAAAAAAAAAAAAAAAAAA
        </Checkbox>
        <Checkbox value="B">B</Checkbox>
        <Checkbox value="C">C</Checkbox>
        <Checkbox value="D">D</Checkbox>
        <Checkbox value="E">E</Checkbox>
      </Checkbox.Group>
    </div>
  );
};

export default NavFillter;
