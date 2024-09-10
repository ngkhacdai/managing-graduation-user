import { createComment, getComment } from "@/api/Comment";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  commentData: null,
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk(
  "commentSlice/fetchComments",
  async (projectId: string) => {
    const response = await getComment(projectId);
    return response;
  }
);

export const createCommentThunk = createAsyncThunk(
  "commentSlice/createComment",
  async (form: { content: string; projectId: number }) => {
    const response = await createComment(form);

    return response;
  }
);

const commentSlice = createSlice({
  name: "commentSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        console.log(action.payload);

        if (action.payload) {
          state.commentData = action.payload;
        } else {
          state.commentData = [];
        }
      });
    builder.addCase(createCommentThunk.fulfilled, (state, action) => {
      state.commentData = [action.payload, ...state.commentData];
    });
  },
});

export default commentSlice.reducer;
