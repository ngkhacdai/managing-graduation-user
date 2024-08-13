"use client";
import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { IoLibrary } from "react-icons/io5";
import { Button, Layout, Menu, message, Select, Tooltip } from "antd";
import { RiProfileLine } from "react-icons/ri";
import Link from "next/link";
import { FaPlus, FaProjectDiagram } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import logo from "@/assets/logo.png";
import { Footer } from "antd/es/layout/layout";
import { BiLogOut } from "react-icons/bi";
import { logoutApi } from "@/api/Access";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import ModalAddNewPhase from "./ModalAddNewPhase";

const { Sider, Content } = Layout;

const SideBarScreen = ({ children }) => {
  const searchParams = useSearchParams();
  const [isShow, setIsShow] = useState(false);
  const [pushed, setPushed] = useState(false);
  const t = useTranslations("SideBar");
  const defaultItems = [
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
  ];
  const phase = useSelector((state) => state.projectDetail.phase);
  const [messageApi, contextHolder] = message.useMessage();
  const [collapsed, setCollapsed] = useState(false);
  const [items, setItems] = useState(defaultItems);
  const router = useRouter();

  const pathName = usePathname();

  const logout = async () => {
    const result = await logoutApi();
    if (result.success) {
      messageApi.success("Successfully logged out");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else {
      messageApi.error("Failed to log out");
    }
  };

  const getKey = () => {
    return "/" + pathName.split("/")[2];
  };

  useEffect(() => {
    const projectName = searchParams?.get("projectName");

    if (projectName) {
      const existingItem = items.find((item) => item.key === projectName);

      if (!existingItem) {
        const newItems = [
          ...defaultItems,
          {
            key: projectName,
            label: projectName,
            icon: <IoLibrary />,
            children: [
              ...phase.map((item) => ({
                key: `/phase${item.id}`,
                icon: <IoLibrary />,
                label: <p>{item.title}</p>,
              })),
            ],
          },
        ];
        setItems(newItems);
        setPushed(true);
      } else {
        // Update the children of the existing item with the new phases
        const updatedItems = items.map((item) => {
          if (item.key === projectName) {
            return {
              ...item,
              children: [
                ...phase.map((item) => ({
                  key: `/phase${item.id}`,
                  icon: <IoLibrary />,
                  label: <p>{item.title}</p>,
                })),
              ],
            };
          }
          return item;
        });
        setItems(updatedItems);
      }
    } else {
      setItems(defaultItems);
      setPushed(false);
    }
  }, [phase, searchParams, pushed]);
  const newPhase = () => {
    setIsShow(true);
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
            selectedKeys={
              searchParams.get("phase")
                ? [`/${searchParams.get("phase")}`]
                : [getKey()]
            }
            items={items}
            onClick={({ key }) => {
              if (key.startsWith("/phase")) {
                const newPhase = key.replace("/", "");
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set("phase", newPhase);
                router.push(newUrl.toString());
              }
            }}
          />

          {searchParams.get("phase") && (
            <Footer className="bg-white px-5">
              <Tooltip title="Add new Phase">
                <Button className="flex items-center" onClick={newPhase}>
                  <FaPlus />
                  {!collapsed && <p>Add new Phase</p>}
                </Button>
              </Tooltip>
            </Footer>
          )}
        </Sider>
        <Layout className="!overflow-y-auto !bg-white">
          <div className="w-full p-2 flex justify-between items-center border-b-inherit border-b-2">
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
                  pathName.split("/")[1] === "en" ? "English" : "Tiếng Việt"
                }
                onChange={(value) => {
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
          <Content>{children}</Content>
        </Layout>
      </Layout>
      {isShow && <ModalAddNewPhase setIsShow={setIsShow} />}
    </div>
  );
};

export default SideBarScreen;
