import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  branch: [
    { id: 1, name: "Hospital Management Industry" },
    { id: 2, name: "branch 2" },
    { id: 3, name: "branch 3" },
    { id: 4, name: "Department of Rehabilitation Engineering" },
    { id: 5, name: "Healthcare organization and management" },
    { id: 6, name: "branch 6" },
    { id: 7, name: "branch 7" },
    { id: 8, name: "branch 8" },
  ],
  year: [2023, 2024],
  listProject: [],
  loading: false,
  branchSelected: [],
  yearSelected: [],
  filteredBranch: [
    { id: 1, name: "Hospital Management Industry" },
    { id: 2, name: "branch 2" },
    { id: 3, name: "branch 3" },
    { id: 4, name: "Department of Rehabilitation Engineering" },
    { id: 5, name: "Healthcare organization and management" },
    { id: 6, name: "branch 6" },
    { id: 7, name: "branch 7" },
    { id: 8, name: "branch 8" },
  ],
};

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
    onSaveSelected: (state, action) => {
      state.branchSelected = action.payload.branches;
      state.yearSelected = action.payload.years;
    },
  },
  extraReducers: (builder) => {},
});

export const { searchBranch, onSaveSelected } = homeSlice.actions;

export default homeSlice.reducer;
