"use client";
import React, { useCallback, useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { IoLibrary } from "react-icons/io5";
import { Badge, Button, Layout, Menu, message, Popover, Tooltip } from "antd";
import { RiProfileLine } from "react-icons/ri";
import Link from "next/link";
import { FaPlus, FaProjectDiagram } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import logo from "@/assets/logo.png";
import { Footer } from "antd/es/layout/layout";
import { BiLogOut } from "react-icons/bi";
import { logoutApi } from "@/api/Access";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import ModalAddNewPhase from "./ModalAddNewPhase";
import {
  clearPhase,
  getPhase,
  getPhaseById,
  getProject,
} from "@/redux/slices/ProjectDetailSlice";
import debounce from "lodash.debounce";
import { IoIosNotifications } from "react-icons/io";
import ModalTurnIn from "./ModalTurnIn";
import { fetchGetNotiUnread } from "@/redux/slices/NotiSlice";
import ContentNotiScreen from "./noti/ContentNoti.screen";

const { Sider, Content } = Layout;

const SideBarScreen = ({ children, role }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isShow, setIsShow] = useState(false);
  const [pushed, setPushed] = useState(false);

  const t = useTranslations("SideBar");
  const pathName = usePathname();
  const dispatch = useDispatch();
  const detailProject = useSelector(
    (state) => state.projectDetail.detailProject
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [collapsed, setCollapsed] = useState(false);
  const numberNotification = useSelector((state) => state.noti.noUnread);
  const [click, setClick] = useState(0);
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

  const [items, setItems] = useState(defaultItems);
  const phase = useSelector((state) => state.projectDetail.phase);

  const contentNoti = <ContentNotiScreen click={click} />;

  const dispatchDebounce = useCallback(
    debounce(() => {
      dispatch(getPhase());
    }, 100),
    []
  );

  useEffect(() => {
    if (pathName.includes("/project/detail")) {
      if (role == "student") {
        if (!detailProject) {
          dispatch(getProject());
        }
        dispatchDebounce();
      } else {
        if (searchParams.get("projectId")) {
          dispatch(getPhaseById(searchParams.get("projectId")));
        } else {
          router.push("/project");
        }
      }
    }
  }, [pathName, dispatchDebounce]);

  const logout = async () => {
    messageApi.success("Successfully logged out");
    setTimeout(() => {
      logoutApi();
    }, 500);
  };

  const getKey = () => {
    return "/" + pathName.split("/")[2];
  };

  useEffect(() => {
    dispatch(fetchGetNotiUnread());

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
                key: `/${item.id}`,
                icon: <IoLibrary />,
                label: <p>{item.phaseName}</p>,
              })),
            ],
          },
        ];
        setItems(newItems);
        setPushed(true);
      } else {
        const updatedItems = items.map((item) => {
          if (item.key === projectName) {
            return {
              ...item,
              children: [
                ...phase.map((item) => ({
                  key: `/${item.id}`,
                  icon: <IoLibrary />,
                  label: <p>{item.phaseName}</p>,
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
  }, [phase]);

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
            items={pathName.includes("/project/detail") ? items : defaultItems}
            onClick={({ key }) => {
              if (key != "/project" && key != "/profile") {
                dispatch(clearPhase());
                const newPhase = key.replace("/", "");
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set("phase", newPhase);
                router.push(newUrl.toString());
              }
            }}
          />
          {detailProject && !detailProject.completed && role != "teacher" ? (
            <Footer className="bg-white px-5">
              {pathName.includes("/project/detail") &&
                phase &&
                (phase.length == 0 ||
                  !phase.some((item) => item.completed == false)) && (
                  <Tooltip title={t("newPhase")}>
                    <Button
                      className="flex w-full items-center justify-start"
                      onClick={newPhase}
                    >
                      <FaPlus />
                      {!collapsed && <p>{t("newPhase")}</p>}
                    </Button>
                  </Tooltip>
                )}
              {pathName.includes("/project/detail") &&
                phase &&
                phase.length > 0 &&
                !phase.some((item) => item.completed == false) && (
                  <ModalTurnIn collapsed={collapsed} />
                )}
            </Footer>
          ) : (
            <></>
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
              <Badge count={numberNotification} size="small">
                <Popover
                  content={contentNoti}
                  trigger="click"
                  placement="bottomRight"
                >
                  <IoIosNotifications
                    onClick={() => setClick(click + 1)}
                    size={20}
                    className="cursor-pointer mx-2"
                  />
                </Popover>
              </Badge>
              <Button
                type="text"
                className="text-lg mx-2 font-semibold"
                onClick={() => {
                  if (pathName.split("/")[1] === "en") {
                    router.push(
                      `/vi/${pathName.split("/")[2]}/${
                        pathName.split("/")[3] ? pathName.split("/")[3] : ""
                      }`
                    );
                  } else {
                    router.push(
                      `/en/${pathName.split("/")[2]}/${
                        pathName.split("/")[3] ? pathName.split("/")[3] : ""
                      }`
                    );
                  }
                }}
              >
                {pathName.split("/")[1] === "en" ? "EN" : "VI"}
              </Button>
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
