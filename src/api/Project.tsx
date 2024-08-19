"use server";
import { revalidatePath } from "next/cache";
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
  if (!response.ok) {
    throw new Error("Failed to add phase");
  }
  revalidatePath("/project");
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
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.token}`,
    },
    body: JSON.stringify({ completed: true }),
  });
  if (!response.ok) {
    throw new Error("Failed to call api");
  }
  revalidatePath("/project");
  return response.json();
};

export const getDataInPhase = async (phaseId: string) => {
  try {
    return await GET(`/getPhaseById/${phaseId}`);
  } catch (error) {
    return [];
  }
};

export const addBoard = async (form) => {
  const cookie = await getCookie();
  const response = await fetch(`${process.env.API_URL}/createBoard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.token}`,
    },
    body: JSON.stringify(form),
  });
  if (!response.ok) {
    throw new Error("Failed to add phase");
  }
  return response.json();
};

export const updateBoardPosition = async (form) => {
  const cookie = await getCookie();
  const response = await fetch(`${process.env.API_URL}/updateBoardPosition`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.token}`,
    },
    body: JSON.stringify(form),
  });
  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to call api");
  }
  return response.json();
};

export const addTask = async (form) => {
  const cookie = await getCookie();
  const response = await fetch(`${process.env.API_URL}/user/addTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.token}`,
    },
    body: JSON.stringify(form),
  });
  if (!response.ok) {
    console.log(response);

    throw new Error("Failed to add phase");
  }
  return response.json();
};

export const updateTaskPosition = async (form) => {
  const cookie = await getCookie();
  const response = await fetch(`${process.env.API_URL}/updateLocationTask`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.token}`,
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error("Failed to call api");
  }
  return response.json();
};

export const deleteTaskById = async (id) => {
  const cookie = await getCookie();
  const response = await fetch(`${process.env.API_URL}/user/deleteTask/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${cookie.token}`,
    },
  });
  if (!response.ok) {
    console.log(response);

    throw new Error("Failed to call api");
  }
  return response.json();
};
