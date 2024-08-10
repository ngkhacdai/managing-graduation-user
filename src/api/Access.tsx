"use server";
import { fail } from "assert";
import { cookies } from "next/headers";

export const login = async (form) => {
  const cookie = cookies();
  try {
    const res = await fetch(`${process.env.API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      console.log(res);

      throw new Error("Network response was not ok");
    }

    const data = await res.json();

    await cookie.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    await cookie.set("role", data.role.toLowerCase(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return {
      success: true,
      message: "Login successful",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Something went wrong, please try again.",
    };
  }
};

export const logoutApi = async () => {
  const cookie = cookies();
  await cookie.delete("token");
  await cookie.delete("role");
  return {
    success: true,
  };
};
