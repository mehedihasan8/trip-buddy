/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { jwtHelpers } from "@/helpers/jwtHelpers";
import { getFromLocalStorage } from "@/utils/local-storage";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const token = getFromLocalStorage("accessToken");
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (token) {
      try {
        const userData = jwtHelpers.decodedJWT(token);
        setUser(userData);
      } catch (error: any) {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <div className="md:min-w-[220px]  md:border-r md:border-l md:border-b border-[#9e483a]">
      {user?.role === "ADMIN" ? (
        <ul className="flex flex-wrap md:flex-col gap-x-8 gap-y-4 font-semibold text-base">
          <Link
            className={`${
              pathname === "/admin" ? "bg-[#e44d36]" : ""
            } text-white py-2 px-5 text-lg`}
            href={"/admin"}
          >
            <li>Dashboard</li>
          </Link>
          <Link
            className={`${
              pathname === "/admin/user-management" ? "bg-[#e44d36]" : ""
            } text-white py-2 px-5 text-lg`}
            href={"/admin/user-management"}
          >
            <li>User Management</li>
          </Link>

          <Link
            className={`${
              pathname === "/admin/all-trip-management" ||
              pathname === "/admin/all-trip-request-management"
                ? "bg-[#e44d36]"
                : ""
            } text-white py-2 px-5 text-lg`}
            href={"/admin/all-trip-management"}
          >
            <li>Trip Management</li>
          </Link>
          <Link
            className={`${
              pathname === "/admin/change-password" ? "bg-[#e44d36]" : ""
            } text-white py-2 px-5 text-lg`}
            href={"/admin/change-password"}
          >
            <li>Change Password</li>
          </Link>
        </ul>
      ) : (
        <ul className="flex flex-wrap md:flex-col gap-x-8 gap-y-4 font-semibold text-base">
          <Link
            className={`${
              pathname === "/user" ? "bg-[#e44d36]" : ""
            } text-white py-2 px-5 text-lg`}
            href={"/user"}
          >
            <li>Post Travel Trip</li>
          </Link>
          <Link
            className={`${
              pathname === "/user/my-all-trip" ||
              pathname === "/user/my-all-trip-request"
                ? "bg-[#e44d36]"
                : ""
            } text-white py-2 px-5 text-lg`}
            href={"/user/my-all-trip"}
          >
            <li>My ALL Trip </li>
          </Link>
          <Link
            className={`${
              pathname === "/user/request" ? "bg-[#e44d36]" : ""
            } text-white py-2 px-5 text-lg`}
            href={"/user/request"}
          >
            <li>My Travel Request</li>
          </Link>
          <Link
            className={`${
              pathname === "/user/profile" ? "bg-[#e44d36]" : ""
            } text-white py-2 px-5 text-lg`}
            href={"/user/profile"}
          >
            <li>Profile</li>
          </Link>
          <Link
            className={`${
              pathname === "/user/change-password" ? "bg-[#e44d36]" : ""
            } text-white py-2 px-5 text-lg`}
            href={"/user/change-password"}
          >
            <li>Change Password</li>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
