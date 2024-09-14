import { filterTeacher, saveFilter } from "@/redux/slices/SignUpSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Button, Checkbox, Col, Form, Modal, Row } from "antd";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalBranch = ({ listBranch, searchText, setFilter, filter }) => {
  const t = useTranslations("SignUp");
  const dispatch = useDispatch<AppDispatch>();
  const [isShow, setIsShow] = useState(false);
  const [form] = Form.useForm();

  const ShowModal = () => {
    setIsShow(true);
    form.setFieldsValue(filter);
  };

  const onOk = () => {
    setFilter(form.getFieldsValue());
    dispatch(saveFilter(form.getFieldsValue()));
    form.submit();
  };
  const submitForm = () => {
    const form1 = {
      teacherName: searchText,
      branch: filter.branch,
    };
    dispatch(filterTeacher(form1));
    setIsShow(false);
  };
  return (
    <div>
      <Button type="primary" onClick={ShowModal}>
        {t("filter")}
      </Button>
      <Modal
        onOk={onOk}
        open={isShow}
        title={t("filter")}
        onCancel={() => setIsShow(false)}
      >
        <Form
          form={form}
          onFinish={submitForm}
          layout="vertical"
          className="select-none"
        >
          <Form.Item name="branch" label={t("Branch")}>
            <Checkbox.Group style={{ width: "100%" }}>
              <Row>
                {listBranch &&
                  listBranch.length > 0 &&
                  listBranch.map((item) => (
                    <Col span={8} className="" key={item.id}>
                      <Checkbox value={item.id}>
                        <p>{item.name}</p>
                      </Checkbox>
                    </Col>
                  ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalBranch;
