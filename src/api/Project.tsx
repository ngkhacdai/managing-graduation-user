"use server";
import { GET, getCookie } from "./customFetch";

export const getProjectDetail = async () => {
  try {
    return await GET("/student/getProject");
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const getPhaseInProject = async () => {
  try {
    return await GET("/user/findPhaseInProject");
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const addPhase = async (form) => {
  const cookie = await getCookie();
  const response = await fetch(`http://26.79.227.10:8080/user/addPhase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.token}`,
    },
    body: JSON.stringify(form),
  });
  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to add phase");
  }

  return response.json();
};

export const deletePhase = async () => {
  const cookie = await getCookie();
  const response = await fetch(`${process.env.API_URL}/student/deletePhase`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${cookie.token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete phase");
  }
  return response.json();
};

export const finishPhase = async () => {
  const cookie = await getCookie();
  const response = await fetch(`${process.env.API_URL}/student/updateDone`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${cookie.token}`,
    },
    body: JSON.stringify({ completed: true }),
  });
  console.log(response.json());

  if (!response.ok) {
    throw new Error("Failed to call api");
  }
  return response.json();
};
