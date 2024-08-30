"use server";

export const getPublicProject = async () => {
  const response = await fetch(
    `${process.env.API_URL}/public/getPublicProject`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch public project: ${response.status}`);
  }
  return response.json();
};

export const getPublicProjectByProjectId = async (projectId: string) => {
  const response = await fetch(
    `${process.env.API_URL}/public/getPublicProject/${projectId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch public project: ${response.status}`);
  }
  return response.json();
};

export const searchProjectPublic = async (form) => {
  const response = await fetch(
    `${process.env.API_URL}/searchProjectPublic?` + new URLSearchParams(form)
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch public project: ${response.status}`);
  }
  return response.json();
};

export const sendCodeForgotPassword = async (form) => {
  const response = await fetch(
    `${process.env.API_URL}/public/sendCode?` + new URLSearchParams(form),
    { method: "PATCH" }
  );
  const res = await response.json();
  if (!response.ok) {
    console.log(response);
    throw new Error(res.message);
  }
  return res;
};
export const resetPassword = async (form) => {
  const response = await fetch(`${process.env.API_URL}/public/forgotPassword`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  const res = await response.json();
  if (!response.ok) {
    throw new Error(res.message);
  }
  return res;
};
