import { getAllBranch } from "@/api/Branch";
import {
  getPublicProject,
  getPublicProjectByProjectId,
  searchProjectPublic,
} from "@/api/Public";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  branch: [],
  year: [2023, 2024],
  listProject: [],
  filter: [],
  searchInput: "",
  loading: false,
};

export const getListBranch = createAsyncThunk(
  "homeSlice/getlistBranch",
  async () => {
    const response = await getAllBranch();
    return response;
  }
);

export const getListProject = createAsyncThunk(
  "homeSlice/getListProject",
  async () => {
    const response = await getPublicProject();
    return response;
  }
);

export const filterProject = createAsyncThunk(
  "homeSlice/filterProject",
  async (form: any) => {
    const response = await searchProjectPublic(form);
    return response;
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    saveFilter: (state, action) => {
      state.filter = action.payload;
    },
    saveSearch: (state, action) => {
      state.searchInput = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListBranch.fulfilled, (state, action) => {
      state.loading = false;
      state.branch = action.payload.data;
    });
    builder
      .addCase(getListProject.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListProject.fulfilled, (state, action) => {
        state.loading = false;
        state.listProject = action.payload;
      });
    builder.addCase(filterProject.fulfilled, (state, action) => {
      state.listProject = action.payload;
    });
  },
});

export const { saveFilter, saveSearch } = homeSlice.actions;

export default homeSlice.reducer;
