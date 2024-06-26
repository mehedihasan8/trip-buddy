"use client";
import {
  updateUserRole,
  updateUserStatus,
  userManagement,
} from "@/services/adminManagement";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import LoadingComponent from "@/components/Loading/Loading";
import Link from "next/link";
import Pagination from "@/components/Pagination/Pagination";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  isActive: "ACTIVATE" | "DEACTIVATE";
}

const UserManagement: React.FC = () => {
  const [allUser, setAllUser] = useState<User[]>([]);
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const itemsPerPage = 9;

  const queryParams = {
    limit: itemsPerPage,
    page: currentPage,
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const data = await userManagement(queryParams);
        setTotalPages(Math.ceil(data?.data?.meta?.total / itemsPerPage));
        setAllUser(data?.data?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getData();
    setUpdate(false);
  }, [update, currentPage]);

  const handleRoleChange = async (
    userId: string,
    newRole: "ADMIN" | "USER"
  ) => {
    const userData = {
      role: newRole,
    };
    const updateData = await updateUserRole(userData, userId);

    if (updateData?.success) {
      toast.success("User Role update successful!");
      setUpdate(true);
    }
  };

  const handleStatusChange = async (
    userId: string,
    newStatus: "ACTIVATE" | "DEACTIVATE"
  ) => {
    const userData = {
      isActive: newStatus,
    };
    const updateData = await updateUserStatus(userData, userId);

    if (updateData?.success) {
      toast.success("User Status update successful!");
      setUpdate(true);
    }
  };

  return (
    <div className="w-full py-10">
      <div className="flex justify-between items-center pb-8">
        <h1 className="text-3xl font-semibold">All Users</h1>
        <Link
          className="text-primaryColor underline text-lg hover:text-blue-600 transition-all"
          href={"/"}
        >
          Back To Home
        </Link>
      </div>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allUser?.map((user) => (
                  <TableRow key={user?.id}>
                    <TableCell className="font-medium w-[170px]">
                      {user?.name}
                    </TableCell>
                    <TableCell>{user?.email}</TableCell>
                    <TableCell>
                      <div className="relative inline-block text-left">
                        <div className="group">
                          <button
                            type="button"
                            className={`${
                              user?.role?.toUpperCase() === "ADMIN"
                                ? "!bg-green-600"
                                : ""
                            } inline-flex justify-center items-center w-24 px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700`}
                          >
                            {user?.role}
                          </button>

                          <div className="absolute z-10 w-24 origin-top-left bg-white divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                            <div>
                              <p
                                onClick={() =>
                                  handleRoleChange(user?.id, "ADMIN")
                                }
                                className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-[#e44d36] hover:text-white"
                              >
                                Admin
                              </p>
                              <p
                                onClick={() =>
                                  handleRoleChange(user?.id, "USER")
                                }
                                className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-[#e44d36] hover:text-white"
                              >
                                User
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="relative inline-block text-left">
                        <div className="group">
                          <button
                            type="button"
                            className={`${
                              user?.isActive?.toUpperCase() === "ACTIVATE"
                                ? "!bg-green-600"
                                : "!bg-[#e44d36]"
                            } inline-flex justify-center items-center w-24 px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700`}
                          >
                            {user?.isActive}
                          </button>

                          <div className="absolute z-10 w-24 origin-top-left bg-white divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                            <div>
                              <p
                                onClick={() =>
                                  handleStatusChange(user?.id, "ACTIVATE")
                                }
                                className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-[#e44d36] hover:text-white"
                              >
                                ACTIVATE
                              </p>
                              <p
                                onClick={() =>
                                  handleStatusChange(user?.id, "DEACTIVATE")
                                }
                                className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-[#e44d36] hover:text-white"
                              >
                                Deactivate
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-center items-center pb-16">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={totalPages}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
