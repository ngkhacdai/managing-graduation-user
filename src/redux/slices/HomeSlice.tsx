import { getAllBranch } from "@/api/Branch";
import { getPublicProject, getPublicProjectByProjectId } from "@/api/Public";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  branch: [],
  year: [2023, 2024],
  listProject: [],
  loading: false,
  filteredBranch: [],
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

// export const getDetailProject = createAsyncThunk(
//   "homeSlice/getDetailProject",
//   async (projectId: string) => {
//     const response = await getPublicProjectByProjectId(projectId);
//     return response;
//   }
// )

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    searchBranch: (state, action) => {
      const searchQuery = action.payload.toLowerCase();
      state.filteredBranch = state.branch.filter((branch) =>
        branch.name.toLowerCase().includes(searchQuery)
      );
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
  },
});

export const { searchBranch } = homeSlice.actions;

export default homeSlice.reducer;
