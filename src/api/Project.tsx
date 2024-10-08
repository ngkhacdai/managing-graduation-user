"use server";
import { revalidatePath } from "next/cache";
import { GET, getCookie } from "./customFetch";
import { redirect } from "next/navigation";

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
    return [];
  }
};

export const addPhase = async (form) => {
  const cookie = await getCookie();
  const response = await fetch(`${process.env.API_URL}/user/addPhase`, {
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
  // const res = await response.json();
  if (!response.ok) {
    throw new Error("Failed to delete phase");
  }
  return response.json();
};

export const finishPhase = async (formData) => {
  const cookie = await getCookie();
  const response = await fetch(
    `${process.env.API_URL}/student/updateCompletePhase`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
      body: formData,
    }
  );
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

export const commentTask = async (form) => {
  const cookie = await getCookie();
  const response = await fetch(`${process.env.API_URL}/createComment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.token}`,
    },
    body: JSON.stringify(form),
  });
  if (!response.ok) {
    console.log(response);

    throw new Error("Failed to call api");
  }
  return response.json();
};

export const getTaskById = async (id: string) => {
  return await GET(`/getTaskById/${id}`);
};

export const updateDescriptionTaskById = async (
  formData: any,
  taskId: string
) => {
  const cookie = await getCookie();
  const response = await fetch(`${process.env.API_URL}/updateTask/${taskId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${cookie.token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to call api");
  }
  return response.json();
};

export const getListProjectByMentor = async () => {
  return await GET(`/getListProjectByMentor`);
};

export const getPhaseByTeacher = async (id: string) => {
  try {
    return await GET(`/getPhaseByProjectId/${id}`);
  } catch (error) {
    revalidatePath("/project");
  }
};

export const updateCompleteProject = async (formData) => {
  const cookie = await getCookie();
  const response = await fetch(`${process.env.API_URL}/updateCompleteProject`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${cookie.token}`,
    },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("Failed to call api");
  }
  return response.json();
};

export const fetchUpdatePhase = async (form) => {
  const cookie = await getCookie();
  const response = await fetch(`${process.env.API_URL}/student/updatePhase`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.token}`,
    },
    body: JSON.stringify(form),
  });
  const res = await response.json();
  if (!response.ok) {
    throw new Error(res.message);
  }
  return res;
};

export const recallSubmission = async () => {
  const cookie = await getCookie();
  const response = await fetch(
    `${process.env.API_URL}/student/recallSubmission`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.token}`,
      },
    }
  );
  if (!response.ok) {
    console.log(response);

    throw new Error("Failed to turn in");
  }
  return response.json();
};

export const updatePointProject = async (form) => {
  const cookie = await getCookie();
  const response = await fetch(`${process.env.API_URL}/admin/updatePoint`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.token}`,
    },
    body: JSON.stringify(form),
  });
  const res = await response.json();
  if (!response.ok) {
    throw new Error(res.message);
  }
  revalidatePath("/project");
  return res;
};

export const updateProject = async (form) => {
  const cookie = await getCookie();
  const response = await fetch(`${process.env.API_URL}/student/updateProject`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie.token}`,
    },
    body: JSON.stringify(form),
  });
  const res = await response.json();
  if (!response.ok) {
    throw new Error(res.message);
  }
  return res;
};
