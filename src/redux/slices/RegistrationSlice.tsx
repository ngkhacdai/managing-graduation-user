import { getListRegis, revokeRegistration } from "@/api/Student";
import {
  approveStudent,
  rejectStudent,
  teacherGetListRegis,
} from "@/api/Teacher";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  studentData: [],
  menteeLimit: "",
  error: "",
};

export const fetchDataRegistration = createAsyncThunk(
  "registration/fetchData",
  async () => {
    const response = await teacherGetListRegis();
    return response;
  }
);

export const appoveStudentByTeacher = createAsyncThunk(
  "registration/appoveStudent",
  async (regisId: number) => {
    const response = await approveStudent(regisId);
    return regisId;
  }
);

export const rejectStudentByTeacher = createAsyncThunk(
  "registration/rejectStudent",
  async (form: any) => {
    const response = await rejectStudent(form);
    return form.regisId;
  }
);

export const getListRegisForstudent = createAsyncThunk(
  "registration/getListRegisForstudent",
  async () => {
    const response = await getListRegis();
    return response;
  }
);

export const revokeRegistrationByStudent = createAsyncThunk(
  "registration/revokeRegistrationByStudent",
  async (regisId: number) => {
    const response = await revokeRegistration(regisId);
    return regisId;
  }
);

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataRegistration.fulfilled, (state, action) => {
        state.data = action.payload?.regisTeacherViewList;
        state.menteeLimit = action.payload?.menteeLimit;
      })
      .addCase(fetchDataRegistration.rejected, (state, action) => {});
    builder
      .addCase(appoveStudentByTeacher.fulfilled, (state, action) => {
        state.menteeLimit = `${Number(state.menteeLimit.split("/")[0]) + 1}/${
          state.menteeLimit.split("/")[1]
        }`;
        state.error = "";

        const findRegistration = state.data.findIndex(
          (item) => item.regisId === action.payload
        );

        if (findRegistration !== -1) {
          state.data[findRegistration].status = "approve";
        }
      })
      .addCase(appoveStudentByTeacher.rejected, (state, action) => {
        state.error = action.payload
          ? action.payload.toString()
          : "Error occurred";
      });
    builder.addCase(rejectStudentByTeacher.fulfilled, (state, action) => {
      state.error = "";
      const findRegistration = state.data.findIndex(
        (item) => item.regisId === action.payload
      );

      if (findRegistration !== -1) {
        state.data[findRegistration].status = "reject";
      }
    });
    builder.addCase(getListRegisForstudent.fulfilled, (state, action) => {
      state.studentData = action.payload;
    });
    builder
      .addCase(revokeRegistrationByStudent.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(revokeRegistrationByStudent.fulfilled, (state, action) => {
        state.studentData = state.studentData.filter(
          (item) => item.id != action.payload
        );
      })
      .addCase(revokeRegistrationByStudent.rejected, (state, action) => {
        console.log("error");
      });
  },
});

export default registrationSlice.reducer;
