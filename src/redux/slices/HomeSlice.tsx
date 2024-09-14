import { getAllBranch } from "@/api/Branch";
import {
  getProject,
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
  error: null,
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

export const getListProjectFilter = createAsyncThunk(
  "homeSlice/getListProjectFilter",
  async (form: any) => {
    const response = await getProject(form);
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
      state.error = null;
      state.branch = action.payload.data;
    });
    builder.addCase(getListBranch.rejected, (state, action) => {
      state.error = "error";
    });
    builder
      .addCase(getListProject.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListProject.fulfilled, (state, action) => {
        state.loading = false;
        state.listProject = action.payload;
      });
    builder
      .addCase(getListProjectFilter.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListProjectFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.listProject = action.payload;
      })
      .addCase(getListProjectFilter.rejected, (state, action) => {
        state.loading = false;
        state.listProject = [];
      });
    builder.addCase(filterProject.fulfilled, (state, action) => {
      state.listProject = action.payload;
    });
  },
});

export const { saveFilter, saveSearch } = homeSlice.actions;

export default homeSlice.reducer;
