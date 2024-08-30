import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchNoti } from "@/redux/slices/NotiSlice";
import { List } from "antd";
import { BsDot } from "react-icons/bs";

const ContentNotiScreen = ({ click }) => {
  const dispatch = useDispatch<AppDispatch>();
  const listNoti = useSelector((state: RootState) => state.noti.listNoti);
  const [call, setCall] = useState(false);

  useEffect(() => {
    dispatch(fetchNoti());
    setCall(true);
  }, [click]);

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={listNoti}
        style={{ width: 300, maxHeight: 400, overflow: "auto" }}
        renderItem={(item, index) => (
          <List.Item className="hover:bg-slate-50 cursor-pointer">
            <List.Item.Meta
              title={<p>{item.title}</p>}
              description={
                <div className="flex items-center justify-between">
                  <div className="w-full">
                    <p>{item.content}</p>
                    <p className="text-right text-xs text-gray-500">
                      {new Date(item.time).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  {!item.read && (
                    <div className="w-1/6">
                      <BsDot size={22} color="red" />
                    </div>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ContentNotiScreen;
