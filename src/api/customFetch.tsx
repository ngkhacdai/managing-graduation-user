"use server";

import { cookies } from "next/headers";

export const getCookie = () => {
  const cookie = cookies();
  const token = cookie.get("token").value;
  return { token };
};

export const GET = async (url: string) => {
  try {
    const { token } = await getCookie();
    const response = await fetch(`${process.env.API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const POST = async (
  url: string,
  data: any,
  contentType = "application/json"
) => {
  const { token } = await getCookie();
  let body: any;

  switch (contentType) {
    case "application/json":
      body = JSON.stringify(data);
      break;
    case "application/x-www-form-urlencoded":
      body = new URLSearchParams(data).toString();
      break;
    case "multipart/form-data":
      body = data;
      break;
    default:
      throw new Error(`Unsupported content type: ${contentType}`);
  }

  const response = await fetch(`${process.env.API_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    },
    body,
  });
  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody);
  }

  return response.json();
};

export const PATCH = async (
  url: string,
  data: any,
  contentType = "application/json"
) => {
  const { token } = await getCookie();
  let body: any;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  switch (contentType) {
    case "application/json":
      body = JSON.stringify(data);
      headers["Content-Type"] = contentType;
      break;
    case "application/x-www-form-urlencoded":
      body = new URLSearchParams(data).toString();
      headers["Content-Type"] = contentType;
      break;
    case "multipart/form-data":
      body = data;
      // Let the browser set the Content-Type with boundary
      break;
    default:
      throw new Error(`Unsupported content type: ${contentType}`);
  }

  const response = await fetch(`${process.env.API_URL}${url}`, {
    method: "PATCH",
    headers,
    body,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Error Response:", errorBody);
    throw new Error(`${errorBody}`);
  }
  console.log("response", response);

  return await response.json();
};
