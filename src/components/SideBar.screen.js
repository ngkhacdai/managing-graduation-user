"use client";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { IoLibrary } from "react-icons/io5";
import {
  Button,
  Layout,
  Menu,
  message,
  Modal,
  Select,
  theme,
  Tooltip,
} from "antd";
import { RiProfileLine } from "react-icons/ri";
import Link from "next/link";
import { FaProjectDiagram } from "react-icons/fa";
import { MdIntegrationInstructions } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/logo.png";
import { Footer } from "antd/es/layout/layout";
import { BiLogOut } from "react-icons/bi";
import { logoutApi } from "@/api/Access";
import { useTranslations } from "next-intl";
const { Header, Sider, Content } = Layout;

const SideBarScreen = ({ children }) => {
  const t = useTranslations("SideBar");
  const [messageApi, contextHolder] = message.useMessage();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathName = usePathname();

  const logout = async () => {
    const result = await logoutApi();
    if (result.success) {
      messageApi.success("Successfully logged out");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      return;
    }
    messageApi.error("Failed to log out");
  };
  const getKey = () => {
    return "/" + pathName.split("/")[2];
  };

  return (
    <div>
      {contextHolder}
      <Layout className="max-h-screen">
        <Sider
          onCollapse={(value) => setCollapsed(value)}
          collapsed={collapsed}
          className="!sticky !top-0 !min-h-screen !bg-white border-r-2 border-inherit"
        >
          <div className="demo-logo-vertical">
            <Link href={"/"}>
              <img
                alt=""
                src={logo.src}
                className="w-20 h-20 mx-auto bg-white"
              />
            </Link>
          </div>
          <Menu
            className="!bg-white"
            theme="light"
            mode="inline"
            defaultSelectedKeys={[getKey()]}
            items={[
              {
                key: "/project",
                icon: <FaProjectDiagram />,
                label: <Link href={"/project"}>{t("project")}</Link>,
              },
              {
                key: "/profile",
                icon: <RiProfileLine />,
                label: <Link href={"/profile"}>{t("profile")}</Link>,
              },
            ]}
          />
          <Footer className="absolute bottom-11 left-0 bg-white p-2 w-full flex items-center justify-center"></Footer>
        </Sider>
        <Layout className="!overflow-y-auto !bg-white">
          <div className=" w-full p-2 flex justify-between items-center border-b-inherit border-b-2">
            <div>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                }}
              />
            </div>
            <div className="flex items-center">
              <Select
                className="mr-2 !w-20 sm:!w-28"
                defaultValue={
                  pathName.split("/")[1] == "en" ? "English" : "Tiếng Việt"
                }
                onChange={(value) => {
                  console.log(`/${value}/${pathName.split("/")[2]}`);
                  router.push(`/${value}/${pathName.split("/")[2]}`);
                }}
                options={[
                  { value: "en", label: t("English") },
                  { value: "vi", label: t("Vietnamese") },
                ]}
              />
              <Tooltip title={t("logout")}>
                <Button
                  onClick={logout}
                  type="text"
                  className="flex items-center justify-center"
                >
                  <BiLogOut size={16} />
                </Button>
              </Tooltip>
            </div>
          </div>
          <Content className=" ">{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default SideBarScreen;
