"use server";
import { GET, getCookie } from "./customFetch";

export const getSession = async () => {
  const response = GET(`/getSessionForRegis`);
  return response;
};
