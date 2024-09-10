import { configureStore } from "@reduxjs/toolkit";

import ProjectDetailReducer from "./slices/ProjectDetailSlice";
import HomeReducer from "./slices/HomeSlice";
import SignUpReducer from "./slices/SignUpSlice";
import NotiReducer from "./slices/NotiSlice";
import RegistrationReducer from "./slices/RegistrationSlice";
import CommentReducer from "./slices/CommentSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      projectDetail: ProjectDetailReducer,
      home: HomeReducer,
      signup: SignUpReducer,
      noti: NotiReducer,
      registration: RegistrationReducer,
      comment: CommentReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
