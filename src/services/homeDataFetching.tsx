"use server";

import { cookies } from "next/headers";

const accessToken = cookies().get("accessToken")?.value || "";

export const getAllTrips = async () => {
  if (!accessToken) {
    throw new Error("No authentication token found");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/trips`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${accessToken}`,
    },
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("data not fetch!");
  }

  const data = await res.json();

  return data;
};