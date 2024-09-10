"use server";
import { getCookie } from "./customFetch";

export const getComment = async (projectId: string) => {
  const cookie = await getCookie();
  try {
    const response = await fetch(
      `${process.env.API_URL}/getComment/${projectId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse JSON:", text);
      throw new Error(`Invalid JSON response: ${parseError.message}`);
    }
  } catch (err) {
    console.error("Error fetching comments:", err);
    throw err;
  }
};

export const createComment = async (form) => {
  const cookie = await getCookie();

  try {
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

      throw new Error(
        `Failed to create comment: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (err) {
    console.error("Error creating comment:", err);
    throw err;
  }
};
