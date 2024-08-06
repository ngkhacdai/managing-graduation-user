"use client";
import React, { Children, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { IoLibrary } from "react-icons/io5";

import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;
import { RiProfileLine } from "react-icons/ri";

import Link from "next/link";
import { FaProjectDiagram } from "react-icons/fa";
import { MdIntegrationInstructions } from "react-icons/md";
import { usePathname } from "next/navigation";
const SideBarScreen = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathName = usePathname();
  const getKey = () => {
    return "/" + pathName.split("/")[1];
  };
  return (
    <Layout>
      <Sider
        onCollapse={(value) => setCollapsed(value)}
        className="!bg-white !sticky"
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          className=" !sticky"
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
            {
              key: "/instruct",
              icon: <MdIntegrationInstructions />,
              label: <Link href={"/project"}>Instruct</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBarScreen;
