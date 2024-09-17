import { checkLogin } from "@/api/Access";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfor: null,
};

export const getInforUser = createAsyncThunk(
  "inforSlice/getInforUser",
  async () => {
    return await checkLogin();
  }
);

const userInforSlice = createSlice({
  name: "inforSlice",
  initialState,
  reducers: {
    clearUserInfor: (state) => {
      state.userInfor = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getInforUser.fulfilled, (state, action) => {
      state.userInfor = action.payload.userName;
    });
  },
});

export const { clearUserInfor } = userInforSlice.actions;

export default userInforSlice.reducer;
