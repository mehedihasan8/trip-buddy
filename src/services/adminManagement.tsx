"use server";

import { cookies } from "next/headers";

const accessToken = cookies().get("accessToken")?.value || "";

export const userManagement = async (queryParams: any) => {
  const params = new URLSearchParams(queryParams);
  if (!accessToken) {
    throw new Error("No authentication token found");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/all-user/?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      credentials: "include",
    }
  );
  if (!res.ok) {
    throw new Error("data not fetch!");
  }

  const data = await res.json();

  return data;
};

export const updateUserStatus = async (data: any, id: string) => {
  if (!accessToken) {
    throw new Error("No authentication token found");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/update-usr-info/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    }
  );

  const user = await res.json();

  return user;
};
export const updateTripRequestStatus = async (data: any, id: string) => {
  if (!accessToken) {
    throw new Error("No authentication token found");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/trip/request/update-status/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    }
  );

  const user = await res.json();

  return user;
};

export const updateUserRole = async (data: any, id: string) => {
  if (!accessToken) {
    throw new Error("No authentication token found");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/update-user-role/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    }
  );

  const user = await res.json();

  return user;
};
export const deleteTrip = async (id: string) => {
  if (!accessToken) {
    throw new Error("No authentication token found");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/delete-trip/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      credentials: "include",
    }
  );

  const user = await res.json();

  return user;
};

export const getAllTripRequest = async (queryParams: any) => {
  const params = new URLSearchParams(queryParams);

  if (!accessToken) {
    throw new Error("No authentication token found");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/trip/request/all-travel-request/?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      credentials: "include",
    }
  );

  const user = await res.json();

  return user;
};

export const getDashboardData = async () => {
  if (!accessToken) {
    throw new Error("No authentication token found");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/dashboard-data`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
      credentials: "include",
    }
  );

  const data = await res.json();

  return data;
};
