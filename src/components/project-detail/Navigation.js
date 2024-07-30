"use client";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
const { Header, Content, Footer } = Layout;
import React from "react";

const Navigation = ({ children }) => {
  const pathName = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const breadcrumbItems = [
    { title: "Home" },
    ...pathName
      .split("/")
      .map((item) => item.trim() && { title: item })
      .filter(Boolean),
  ];
  const searchParams = useSearchParams();
  const items = [
    {
      key: "/project/detail",
      label: <Link href={`/project/detail?${searchParams}`}>Stream</Link>,
    },
    {
      key: "/project/detail/classwork",
      label: (
        <Link href={`/project/detail/classwork?${searchParams}`}>
          Classwork
        </Link>
      ),
    },
  ];
  return (
    <div>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            background: "white",
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[pathName]}
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
        </Header>
        <Content
          style={{
            padding: "0 48px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
            items={breadcrumbItems}
          />
          <div
            style={{
              background: colorBgContainer,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
            className="min-h-[34rem]"
          >
            {children}
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default Navigation;
