import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchNoti } from "@/redux/slices/NotiSlice";
import { Divider, List, Skeleton } from "antd";
import { BsDot } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from "lodash.debounce";
import ModalNotification from "./ModalNotification";

const ContentNotiScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const listNoti = useSelector((state: RootState) => state.noti.listNoti);
  const page = useSelector((state: RootState) => state.noti.page);
  const loading = useSelector((state: RootState) => state.noti.loadingMore);
  const totalNotification = useSelector(
    (state: RootState) => state.noti.totalNotification
  );
  const [called, setCalled] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const debounceFetchNoti = useCallback(
    debounce(() => {
      dispatch(fetchNoti(page));
    }, 300),
    [dispatch, page]
  );

  useEffect(() => {
    setCalled(true);
    if (!called) {
      debounceFetchNoti();
    }
  }, [debounceFetchNoti, called]);

  const loadMoreData = () => {
    if (loading) {
      dispatch(fetchNoti(page));
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
  };

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        width: 350,
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        next={loadMoreData}
        dataLength={listNoti.length}
        loader={<Skeleton paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        hasMore={listNoti.length < totalNotification}
        scrollableTarget="scrollableDiv"
      >
        <List
          itemLayout="horizontal"
          dataSource={listNoti}
          renderItem={(item) => (
            <List.Item
              className={`hover:bg-slate-50 cursor-pointer ${
                !item.read && "bg-blue-50"
              }`}
              onClick={() => handleItemClick(item)}
            >
              <List.Item.Meta
                title={<p>{item.title}</p>}
                description={
                  <div className={`flex  items-center justify-between `}>
                    <div className="w-full">
                      <p className="break-words line-clamp-2">{item.content}</p>
                      <p className="text-right text-xs text-gray-500">
                        {new Date(item.time).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>

      {/* Modal for showing item details */}
      {selectedItem && (
        <ModalNotification item={selectedItem} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default ContentNotiScreen;
