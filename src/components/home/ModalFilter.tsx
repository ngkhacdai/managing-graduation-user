import { Button, Collapse, Modal } from "antd";
import Search from "antd/es/input/Search";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import Branch from "./collapse_items/Branch";
import Year from "./collapse_items/Year";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { onSaveSelected } from "@/redux/slices/HomeSlice";

const ModalFilter = () => {
  const t = useTranslations("HomePage");
  const dispatch = useDispatch();

  // Get the saved selections from Redux store
  const savedBranches = useSelector(
    (state: RootState) => state.home.branchSelected
  );
  const savedYears = useSelector((state: RootState) => state.home.yearSelected);

  // Local state to manage the selections within the modal
  const [isShow, setIsShow] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState(savedBranches);
  const [selectedYears, setSelectedYears] = useState(savedYears);

  const items = [
    {
      key: "branches",
      label: "Branch",
      children: (
        <Branch selected={selectedBranches} onSelect={setSelectedBranches} />
      ),
    },
    {
      key: "years",
      label: "Year",
      children: <Year selected={selectedYears} onSelect={setSelectedYears} />,
    },
  ];

  const saveFilter = () => {
    dispatch(
      onSaveSelected({ branches: selectedBranches, years: selectedYears })
    );
    setIsShow(false);
  };

  const cancelFilter = () => {
    // Revert to the saved selections
    setSelectedBranches(savedBranches);
    setSelectedYears(savedYears);
    setIsShow(false);
  };

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <>
      <div className="flex items-center">
        <Search
          className="mr-2"
          placeholder={`${t("search input")}`}
          size="middle"
          onSearch={onSearch}
        />
        <Button onClick={() => setIsShow(true)}>Filter</Button>
      </div>
      <Modal
        className="md:!min-w-[40rem] lg:!min-w-[50rem]"
        open={isShow}
        onOk={saveFilter}
        onCancel={cancelFilter}
        title={<p>{t("filter")}</p>}
      >
        <Collapse items={items} defaultActiveKey={["branches"]} />
      </Modal>
    </>
  );
};

export default ModalFilter;
