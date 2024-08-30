"use server";
import { GET, getCookie, PATCH, POST } from "./customFetch";

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

export const getTeacherProfileById = async (id) => {
  return await GET(`/getTeacherProfileById/${id}`);
};

export const searchTeacher = async (form) => {
  const cookie = await getCookie();
  const response = await fetch(
    `${process.env.API_URL}/searchTeacher?` + new URLSearchParams(form),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.token}`,
      },
    }
  );

  if (!response.ok) {
    console.log(response);

    throw new Error(`Failed to fetch public project: ${response.status}`);
  }
  return response.json();
};
