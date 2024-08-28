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
