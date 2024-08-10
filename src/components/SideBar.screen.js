"use client";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { IoLibrary } from "react-icons/io5";
import { Button, Layout, Menu, message, Modal, theme } from "antd";
import { RiProfileLine } from "react-icons/ri";
import Link from "next/link";
import { FaProjectDiagram } from "react-icons/fa";
import { MdIntegrationInstructions } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/assets/logo.png";
import { Footer } from "antd/es/layout/layout";
import { BiLogOut } from "react-icons/bi";
import { logoutApi } from "@/api/Access";
const { Header, Sider, Content } = Layout;

const SideBarScreen = ({ children }) => {
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
    return "/" + pathName.split("/")[1];
  };

  return (
    <div>
      {contextHolder}
      <Layout className="max-h-screen">
        <Sider
          onCollapse={(value) => setCollapsed(value)}
          collapsible
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
                label: <Link href={"/project"}>Project</Link>,
              },
              {
                key: "/library",
                icon: <IoLibrary />,
                label: <Link href={"/library"}>Library</Link>,
              },
              {
                key: "/profile",
                icon: <RiProfileLine />,
                label: <Link href={"/profile"}>Profile</Link>,
              },
            ]}
          />
          <Footer className="absolute bottom-11 left-0 bg-white p-2 w-full flex items-center justify-center">
            <Button
              onClick={logout}
              type="text"
              className="flex items-center h-16 w-full justify-center"
            >
              <BiLogOut size={18} />
              {!collapsed && <p className="text-lg ml-2">Log out</p>}
            </Button>
          </Footer>
        </Sider>
        <Layout className="!overflow-y-auto">
          <Content className="bg-white">{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default SideBarScreen;
