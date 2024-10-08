import { Button, Flex, Form, Spin, Table, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import ModalSignUp from "./ModalSignUp";
import { useTranslations } from "next-intl";
import ModalProfileTeacher from "./ModalProfileTeacher";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import debounce from "lodash.debounce";
import { fetchDataTeacher } from "@/redux/slices/SignUpSlice";
import { FaRegEdit } from "react-icons/fa";

const TableTeacher = ({ listBranch }) => {
  const t = useTranslations("SignUp");
  const dispatch = useDispatch<AppDispatch>();
  const [isShowModalSignUp, setIsShowModalSignUp] = useState(false);
  const [saveTeacher, setSaveTeacher] = useState([]);
  const listTeacher = useSelector(
    (state: RootState) => state.signup.listTeacher
  );
  const loading = useSelector((state: RootState) => state.signup.loading);
  console.log(listTeacher);
  const debounceFetchData = useCallback(
    debounce(() => {
      dispatch(fetchDataTeacher());
    }, 300),
    []
  );
  useEffect(() => {
    debounceFetchData();
  }, []);
  const columns = [
    {
      title: "No",
      key: "no",
      render: (record, text, index) => {
        return index + 1;
      },
    },
    {
      title: t("TeacherName"),
      dataIndex: "fullName",
      key: "name",
    },
    {
      title: t("Branch"),
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: t("Degree"),
      key: "degree",
      dataIndex: "degree",
    },
    {
      title: t("beginTeachingYear"),
      key: "beginTeachingYear",
      dataIndex: "beginTeachingYear",
    },
    {
      title: t("numberStudentSingUp"),
      key: "numberOfMentees",
      render: (record) => {
        return (
          <p>
            {record.numberOfMentees}/{record.limitOfMentees}
          </p>
        );
      },
    },
    {
      title: t("Action"),
      key: "action",
      render: (record) => {
        return (
          <div className="flex">
            <Tooltip title={t("signUp")}>
              <Button
                type="primary"
                onClick={() => handleSignUp(record)}
                disabled={record.registered}
              >
                <FaRegEdit />
              </Button>
            </Tooltip>
            <ModalProfileTeacher id={record.id} />
          </div>
        );
      },
    },
  ];
  const handleSignUp = (record) => {
    setSaveTeacher(record);
    setIsShowModalSignUp(true);
  };
  const handleCloseModalSignUp = () => {
    setSaveTeacher([]);
    setIsShowModalSignUp(false);
  };
  if (loading) {
    return (
      <Flex align="center" gap="middle">
        <Spin />
      </Flex>
    );
  }
  return (
    <div>
      <Table
        rowKey={"id"}
        scroll={{ x: 600 }}
        columns={columns}
        dataSource={listTeacher}
      />
      {isShowModalSignUp && (
        <ModalSignUp
          handleCloseModalSignUp={handleCloseModalSignUp}
          saveTeacher={saveTeacher}
          listBranch={listBranch}
        />
      )}
    </div>
  );
};

export default TableTeacher;
