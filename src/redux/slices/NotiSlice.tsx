import { getNotification, getNotificationUnRead } from "@/api/Notification";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  listNoti: [],
  noUnread: 0,
};

export const fetchGetNotiUnread = createAsyncThunk(
  "notiSlice/fetchGetNotiUnread",
  async () => {
    const response = await getNotificationUnRead();
    return response;
  }
);
export const fetchNoti = createAsyncThunk("notiSlice/fetchNoti", async () => {
  const response = await getNotification();
  return response;
});

export const NotiSlice = createSlice({
  name: "noti",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetNotiUnread.fulfilled, (state, action) => {
      state.noUnread = action.payload?.unread;
    });
    builder.addCase(fetchNoti.fulfilled, (state, action) => {
      state.listNoti = action.payload;
      state.noUnread = 0;
    });
  },
});

export default NotiSlice.reducer;
