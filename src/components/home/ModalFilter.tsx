import { Button, Checkbox, Col, Form, Modal, Row } from "antd";
import Search from "antd/es/input/Search";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  filterProject,
  getListBranch,
  saveFilter,
  saveSearch,
} from "@/redux/slices/HomeSlice";
import debounce from "lodash.debounce";

const ModalFilter = () => {
  const t = useTranslations("HomePage");
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [isShow, setIsShow] = useState(false);
  const listBranch = useSelector((state: RootState) => state.home.branch) || [];
  const keyword = useSelector((state: RootState) => state.home.searchInput);
  const [selectedBranches, setSelectedBranches] = useState({ branch: [] });
  const [searchText, setSearchText] = useState("");
  const debouncegetListBranch = useCallback(
    debounce(() => {
      dispatch(getListBranch());
    }, 300),
    []
  );

  useEffect(() => {
    if (listBranch.length <= 0) {
      debouncegetListBranch();
    }
  }, [listBranch]);

  const onOk = () => {
    setSelectedBranches(form.getFieldsValue());
    dispatch(saveFilter(form.getFieldValue("branch")));
    form.submit();
  };

  const cancelFilter = () => {
    setIsShow(false);
  };

  const onSearch = (value) => {
    dispatch(saveSearch(value));
    const form1 = {
      keyword: value,
      branch: selectedBranches.branch,
    };
    dispatch(filterProject(form1));
  };
  const submitForm = (e) => {
    const form1 = {
      keyword: searchText,
      branch: selectedBranches.branch,
    };
    dispatch(filterProject(form1));
    setIsShow(false);
  };

  return (
    <>
      <div className="flex items-center">
        <Search
          className="mr-2"
          placeholder={`${t("search input")}`}
          size="middle"
          onSearch={onSearch}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          onClick={() => {
            setIsShow(true);
          }}
        >
          {t("filter")}
        </Button>
      </div>
      <Modal
        className="md:!min-w-[40rem] lg:!min-w-[50rem]"
        open={isShow}
        onOk={onOk}
        onCancel={cancelFilter}
        title={<p>{t("filter")}</p>}
      >
        <Form
          form={form}
          onFinish={submitForm}
          layout="vertical"
          initialValues={{
            branch: selectedBranches.branch,
          }}
          className="select-none"
        >
          <Form.Item name="branch" label={t("branch")}>
            <Checkbox.Group style={{ width: "100%" }}>
              <Row>
                {listBranch &&
                  listBranch.length > 0 &&
                  listBranch.map((item) => (
                    <Col className="m-1" key={item.id}>
                      <Checkbox value={item.id}>{item.name}</Checkbox>
                    </Col>
                  ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalFilter;
