import { GET, PATCH, POST } from "./customFetch";

export const getStudentProfile = async () => {
  return await GET("/user/getPfStudent");
};

export const updateStudentProfile = async (formData) => {
  return await PATCH("/student/updateProfile", formData, "multipart/form-data");
};
