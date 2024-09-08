"use server";
import { revalidatePath } from "next/cache";
import { GET, getCookie, PATCH, POST } from "./customFetch";

export const getStudentProfile = async () => {
  return await GET("/user/getPfStudent");
};

export const updateStudentProfile = async (formData) => {
  return await PATCH("/student/updateProfile", formData, "multipart/form-data");
};

export const addProject = async (formData) => {
  const cookies = await getCookie();
  const url = `${process.env.API_URL}/createRegis`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
    body: formData,
  });
  if (!response.ok) {
    // console.log(response);

    const errorBody = await response.json();
    // console.log(errorBody);

    throw new Error(errorBody.message);
  }
  return response.json();
};

export const getStudentProfileByProjectId = async (projectId) => {
  return await GET(`/getStudentProfileById/${projectId}`);
};

export const getListRegis = async () => {
  return await GET(`/student/getListRegis`);
};

export const getDetailRegis = async (regisId: number) => {
  return await GET(`/student/getDetailRegis/${regisId}`);
};

export const revokeRegistration = async (regisId: number) => {
  const cookies = await getCookie();
  const url = `${process.env.API_URL}/student/deleteRegis/${regisId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${cookies.token}`,
    },
  });
  const res = await response.json();
  if (!response.ok) {
    throw new Error(res.message);
  }
  return res;
};
