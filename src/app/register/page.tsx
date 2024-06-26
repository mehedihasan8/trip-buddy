"use client";

import RegisterComponent from "@/components/LoginAndRegister/RegisterFrom";

import Link from "next/link";
import { usePathname } from "next/navigation";

const RegisterPage = () => {
  const pathname = usePathname();

  return (
    <div className="bg-loginSection bg-opacity-50 min-h-[100vh]">
      <div className="flex items-center justify-center min-h-[100vh]">
        <div className="border w-[500px] bg-white text-black p-6">
          <h1 className="text-center text-4xl font-extrabold text-[#e44d36] cursor-pointer py-2">
            Trip<span className="text-black">Buddy</span>
          </h1>
          <div className="flex justify-between items-center text-white py-6">
            <Link href="/login">
              <button
                className={`${
                  pathname === "/login"
                    ? "!bg-[#e44d36]"
                    : "text-[#e44d36] border border-[#e44d36]"
                } hover:bg-[#e44d36] hover:text-white py-2 px-20 text-lg font-semibold transition-all duration-200`}
              >
                Sign In
              </button>
            </Link>
            <Link href="/register">
              <button
                className={`${
                  pathname === "/register"
                    ? "!bg-[#e44d36]"
                    : "text-[#e44d36] border border-[#e44d36]"
                } hover:bg-[#e44d36] hover:text-white py-2 px-20 text-lg font-semibold transition-all duration-200`}
              >
                Sign Up
              </button>
            </Link>
          </div>
          <RegisterComponent />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
