"use server";
import { GET } from "./customFetch";

export const getAllBranch = async () => {
  const response = await fetch(`${process.env.API_URL}/getAllBranch`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to call api");
  }
  return response.json();
};
