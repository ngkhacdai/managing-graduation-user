"use server";
import { GET, getCookie, PATCH, POST } from "./customFetch";

export const getStudentProfile = async () => {
  return await GET("/user/getPfStudent");
};

export const updateStudentProfile = async (formData) => {
  return await PATCH("/student/updateProfile", formData, "multipart/form-data");
};

export const addProject = async (form) => {
  const cookies = await getCookie();
  const url = `http://26.79.227.10:8080/student/addProject`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
    body: JSON.stringify(form),
  });
  if (!response.ok) {
    console.log(response);

    const errorBody = await response.json();
    throw new Error(errorBody);
  }
  return await response.json();
};
