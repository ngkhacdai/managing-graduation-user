import { addProject } from "@/api/Student";
import { getAllTeacher, searchTeacher } from "@/api/Teacher";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { error } from "console";

const initialState = {
  listTeacher: [],
  filter: {
    branch: [],
  },
  searchInput: "",
  error: "",
};
interface SignUpPayload {
  formData: any;
  teacherId: any;
}
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

export const signUpTeacher = createAsyncThunk(
  "signUpSlice/signUpTeacher",
  async ({ formData, teacherId }: SignUpPayload) => {
    const response = await addProject(formData);
    return teacherId;
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
    builder
      .addCase(signUpTeacher.fulfilled, (state, action) => {
        state.error = "";

        const findTeacher = state.listTeacher.findIndex(
          (item) => item.id === action.payload
        );

        if (findTeacher !== -1) {
          console.log("data", state.listTeacher[findTeacher]);

          state.listTeacher[findTeacher].registered = true;
        } else {
          console.log("Teacher not found");
        }
      })
      .addCase(signUpTeacher.rejected, (state, action) => {
        state.error = action.payload.toString();
      });
  },
});

export const { saveFilter, saveSearch } = signUpSlice.actions;

export default signUpSlice.reducer;
