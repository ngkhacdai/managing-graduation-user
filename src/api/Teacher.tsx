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
    const response = await GET("/getAllTeacher");
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
