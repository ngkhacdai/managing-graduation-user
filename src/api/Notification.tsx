"use server";
import { getCookie } from "./customFetch";

export const getNotification = async (page: number) => {
  const cookie = await getCookie();
  const response = await fetch(
    `${process.env.API_URL}/user/getNotification/${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.token}`,
      },
    }
  );
  const res = await response.json();
  if (!response.ok) {
    console.log(response);
    throw new Error(res);
  }
  return res;
};
export const getNotificationUnRead = async () => {
  const cookie = await getCookie();
  const response = await fetch(
    `${process.env.API_URL}/user/getNumberNotificationUnread`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.token}`,
      },
    }
  );
  const res = await response.json();
  if (!response.ok) {
    console.log(response);
    throw new Error(res);
  }
  return res;
};
