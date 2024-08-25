import { RootState } from "@/redux/store";
import { Checkbox, Col, Row } from "antd";
import { useTranslations } from "next-intl";
import React from "react";
import { useSelector } from "react-redux";

const Year = ({ selected, onSelect }) => {
  const listYear = useSelector((state: RootState) => state.home.year);
  const t = useTranslations("HomePage");

  const onChange = (checkedValues) => {
    onSelect(checkedValues);
  };

  return (
    <div className="select-none">
      <div>
        <Checkbox.Group
          className="w-full flex flex-col max-w-full"
          onChange={onChange}
          value={selected}
        >
          <Row>
            {listYear &&
              listYear.map((item, index) => (
                <Col key={`year-${index}`}>
                  <Checkbox
                    className="truncate whitespace-nowrap flex mr-2"
                    value={item}
                  >
                    {item}
                  </Checkbox>
                </Col>
              ))}
          </Row>
        </Checkbox.Group>
      </div>
    </div>
  );
};

export default Year;
