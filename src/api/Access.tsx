"use server";
import { cookies } from "next/headers";

export const login = async (form) => {
  const cookie = cookies();
  await cookie.set(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    }
  );

  if (form.email === "teacher") {
    await cookie.set("role", "teacher", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  } else {
    await cookie.set("role", "student", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  }

  return {
    success: true,
  };
};

export const logoutApi = async () => {
  const cookie = cookies();
  await cookie.delete("token");
  await cookie.delete("role");
  return {
    success: true,
  };
};
