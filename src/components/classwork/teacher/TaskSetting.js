import React from "react";
import { Form, Select, DatePicker } from "antd";

const TaskSettings = ({ formSetting, onOkDatePicker }) => (
  <Form
    form={formSetting}
    initialValues={{
      point: "100",
    }}
    layout="vertical"
  >
    <Form.Item label="Point" name="point">
      <Select
        options={[
          {
            value: 10,
            label: "10",
          },
          {
            value: 100,
            label: "100",
          },
        ]}
      />
    </Form.Item>
    <Form.Item label="Due" name="due">
      <DatePicker
        showTime
        className="w-full"
        onChange={(value, dateString) => {
          console.log("Selected Time: ", value);
          console.log("Formatted Selected Time: ", dateString);
        }}
        onOk={onOkDatePicker}
      />
    </Form.Item>
  </Form>
);

export default TaskSettings;
