import { GET, PATCH, POST } from "./customFetch";

export const getTeacherProfile = async () => {
  return await GET("/teacher/getProfile");
};

export const updateTeacherProfile = async (formData) => {
  return await PATCH(
    "/teacher/updateTeacherProfile",
    formData,
    "multipart/form-data"
  );
};

export const getAllTeacher = async () => {
  try {
    return await GET("/getAllTeacher");
  } catch (error) {
    console.log(error);
    return null;
  }
};
