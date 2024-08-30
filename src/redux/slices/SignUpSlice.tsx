import { getAllTeacher, searchTeacher } from "@/api/Teacher";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  listTeacher: [],
  filter: {
    branch: [],
  },
  searchInput: "",
};

export const fetchDataTeacher = createAsyncThunk(
  "signUpSlice/fetchDataTeacher",
  async () => {
    const response = await getAllTeacher();
    return response;
  }
);

export const filterTeacher = createAsyncThunk(
  "signUpSlice/filterTeacher",
  async (form: any) => {
    const response = await searchTeacher(form);
    return response;
  }
);

const signUpSlice = createSlice({
  name: "signUpSlice",
  initialState,
  reducers: {
    saveFilter: (state, action) => {
      state.filter.branch = action.payload.branch;
    },
    saveSearch: (state, action) => {
      state.searchInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataTeacher.fulfilled, (state, action) => {
        state.listTeacher = action.payload;
      })
      .addCase(fetchDataTeacher.rejected, (state, action) => {
        state.listTeacher = [];
      });
    builder.addCase(filterTeacher.fulfilled, (state, action) => {
      state.listTeacher = action.payload;
    });
  },
});

export const { saveFilter, saveSearch } = signUpSlice.actions;

export default signUpSlice.reducer;
