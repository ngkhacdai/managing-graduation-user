import { Button, Checkbox, Col, Form, Modal, Row, Select } from "antd";
import Search from "antd/es/input/Search";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  getListBranch,
  getListProject,
  getListProjectFilter,
  saveFilter,
} from "@/redux/slices/HomeSlice";
import debounce from "lodash.debounce";

const ModalFilter = () => {
  const t = useTranslations("HomePage");
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [isShow, setIsShow] = useState(false);
  const listBranch = useSelector((state: RootState) => state.home.branch) || [];
  const listProject = useSelector((state: RootState) => state.home.listProject);
  const [selectedBranches, setSelectedBranches] = useState({ branch: [] });
  const [searchText, setSearchText] = useState("");
  const [time, setTime] = useState(0);
  const [point, setPoint] = useState(0);
  const error = useSelector((state: RootState) => state.home.error);

  const debounceProject = useCallback(
    debounce((formData) => {
      dispatch(getListProjectFilter(formData));
    }, 300),
    []
  );

  useEffect(() => {
    const formData: any = {
      keyword: searchText,
      branch: selectedBranches.branch || [],
    };
    switch (point) {
      case 0:
        formData.highestScore = false;
        break;
      case 1:
        formData.highestScore = true;
        break;
      case 2:
        formData.lowestScore = true;
        break;
      default:
        break;
    }
    switch (time) {
      case 0:
        formData.oldest = false;
        break;
      case 1:
        formData.oldest = true;
        break;
      case 2:
        formData.latest = true;
        break;
      default:
        break;
    }
    debounceProject(formData);
  }, [time, point]);

  const debounceListProject = useCallback(
    debounce(() => {
      dispatch(getListProject());
    }, 300),
    []
  );

  useEffect(() => {
    debounceListProject();
  }, []);

  const debouncegetListBranch = useCallback(
    debounce(() => {
      dispatch(getListBranch());
    }, 300),
    []
  );

  useEffect(() => {
    debouncegetListBranch();
  }, []);

  const onOk = () => {
    const newSelectedBranches = form.getFieldValue("branch");
    dispatch(saveFilter(newSelectedBranches));
    setSelectedBranches({ branch: newSelectedBranches });
    form.submit();
  };

  const cancelFilter = () => {
    setIsShow(false);
  };

  const onSearch = (value) => {
    const formData: any = {
      keyword: searchText,
      branch: selectedBranches.branch || [],
    };
    switch (point) {
      case 0:
        formData.highestScore = false;
        break;
      case 1:
        formData.highestScore = true;
        break;
      case 2:
        formData.lowestScore = true;
        break;
      default:
        break;
    }
    switch (time) {
      case 0:
        formData.oldest = false;
        break;
      case 1:
        formData.oldest = true;
        break;
      case 2:
        formData.latest = true;
        break;
      default:
        break;
    }
    debounceProject(formData);
  };

  const submitForm = (e) => {
    const formData: any = {
      keyword: searchText,
      branch: selectedBranches.branch || [],
    };
    switch (point) {
      case 0:
        formData.highestScore = false;
        break;
      case 1:
        formData.highestScore = true;
        break;
      case 2:
        formData.lowestScore = true;
        break;
      default:
        break;
    }
    switch (time) {
      case 0:
        formData.oldest = false;
        break;
      case 1:
        formData.oldest = true;
        break;
      case 2:
        formData.latest = true;
        break;
      default:
        break;
    }

    debounceProject(formData);
    setIsShow(false);
  };

  const timeOptions = [
    {
      label: `${t("selectTimeZone")}`,
      value: 0,
    },
    {
      label: `${t("newlyUpdated")}`,
      value: 1,
    },
    {
      label: `${t("oldestUpdated")}`,
      value: 2,
    },
  ];

  const pointOptions = [
    {
      label: `${t("selectPoint")}`,
      value: 0,
    },
    {
      label: `${t("highestPoint")}`,
      value: 1,
    },
    {
      label: `${t("lowestPoint")}`,
      value: 2,
    },
  ];

  return (
    <>
      <div className="flex items-center gap-2">
        <Select
          className="min-w-52"
          options={timeOptions}
          value={time}
          onChange={(value) => {
            setTime(value);
            setPoint(0);
          }}
          placeholder="Select Time"
        />
        <Select
          className="min-w-36"
          options={pointOptions}
          value={point}
          onChange={(value) => {
            setPoint(value);
            setTime(0);
          }}
          placeholder="Select Point"
        />
        <Search
          className="mr-2"
          placeholder={`${t("search input")}`}
          size="middle"
          onSearch={onSearch}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          type="primary"
          onClick={() => {
            setIsShow(true);
            form.setFieldsValue({ branch: selectedBranches.branch });
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
                    <Col
                      span={4}
                      className="m-1 line-clamp-1 truncate"
                      key={item.id}
                    >
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
