import { getNotification, getNotificationUnRead } from "@/api/Notification";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  listNoti: [],
  noUnread: 0,
  loadingMore: true,
  page: 0,
  totalNotification: 0,
};

export const fetchGetNotiUnread = createAsyncThunk(
  "notiSlice/fetchGetNotiUnread",
  async () => {
    const response = await getNotificationUnRead();
    return response;
  }
);
export const fetchNoti = createAsyncThunk(
  "notiSlice/fetchNoti",
  async (page: number) => {
    const response = await getNotification(page);
    return response;
  }
);

export const NotiSlice = createSlice({
  name: "noti",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetNotiUnread.fulfilled, (state, action) => {
      state.noUnread = action.payload?.unread;
    });
    builder
      .addCase(fetchNoti.fulfilled, (state, action) => {
        console.log(action.payload);
        state.totalNotification = action.payload.totalNotification;
        state.page = state.page + 1;
        state.listNoti = [...state.listNoti, ...action.payload.notification];
        state.noUnread = 0;
      })
      .addCase(fetchNoti.rejected, (state, action) => {
        state.loadingMore = false;
      });
  },
});

export default NotiSlice.reducer;
