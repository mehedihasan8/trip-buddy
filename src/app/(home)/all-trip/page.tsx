"use client";

import TripHeroSection from "@/components/BannerSection/TripHeroSection";
import SingleCard from "@/components/Card/SingleCard";
import LoadingComponent from "@/components/Loading/Loading";
import Pagination from "@/components/Pagination/Pagination";

import { getAllTrips } from "@/services/homeDataFetching";
import React, { useEffect, useState } from "react";

export type Trip = {
  id: string;
};

const AllTripPage: React.FC = () => {
  const [filter, setFilter] = useState<string>("Filter");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [allTrips, setTrips] = useState<Trip[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 9;

  const queryParams = {
    limit: itemsPerPage,
    page: currentPage,
    searchTerm: searchQuery,
    sortBy,
    sortOrder,
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      try {
        const data = await getAllTrips(queryParams);

        const fetchedTrips = data?.data?.data ?? [];
        setTrips(fetchedTrips);
        setTotalPages(Math.ceil(data?.data?.meta?.total / itemsPerPage));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getData();
    setUpdate(false);
  }, [update, searchQuery, currentPage, sortOrder, sortBy]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    setUpdate(true);
  };

  return (
    <div>
      <TripHeroSection />
      <div className="container flex flex-col md:flex-row justify-between items-center mt-14">
        <h1 className="text-2xl font-semibold">All Trips</h1>
        <div className="flex items-center gap-3">
          <input
            type="text"
            autoComplete="off"
            placeholder="Search..."
            className="block w-[200px] border border-gray-400 bg-gray-100 px-3 py-2 shadow-sm placeholder:font-semibold placeholder:text-black/60 focus:border-[#e44d36] focus:outline-none focus:!text-primaryColor placeholder:text-primaryColor focus:font-semibold focus:ring-1 focus:ring-[#e44d36] sm:text-sm"
            style={{ color: "black" }}
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <div className="min-w-[100px] text-gray-900">
            <div className="relative w-full group">
              <button className="py-2 capitalize text-white px-3 w-full md:text-sm text-site bg-transparent border border-dimmed focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded font-semibold">
                {filter}
              </button>
              <div className="absolute z-[99] top-[55px] translate-x-[-50%] rounded-md overflow-hidden shadow-lg min-w-[200px] w-max peer-focus:visible peer-focus:opacity-100 opacity-0 invisible duration-200 bg-gray-100 border border-dimmed text-xs md:text-sm">
                <div
                  onClick={() => {
                    setFilter("See All Trips");
                    setSortBy("");
                    setSortOrder("");
                  }}
                  className="w-full hover:text-white block cursor-pointer hover:bg-[#e44d36] hover:text-link px-4 py-2 rounded-md"
                >
                  See All Trips
                </div>
                <div
                  onClick={() => {
                    setFilter("Filter by Low to High Price");
                    setSortBy("budget");
                    setSortOrder("asc");
                  }}
                  className="w-full hover:text-white block cursor-pointer hover:bg-[#e44d36] hover:text-link px-4 py-2 rounded-md"
                >
                  Filter by Low to High Price
                </div>
                <div
                  onClick={() => {
                    setFilter("Filter by High to Low Price");
                    setSortBy("budget");
                    setSortOrder("desc");
                  }}
                  className="w-full hover:text-white block cursor-pointer hover:bg-[#e44d36] hover:text-link px-4 py-2 rounded-md"
                >
                  Filter by High to Low Price
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 mx-auto">
          {allTrips?.map((card: any) => (
            <SingleCard card={card} key={card?.id} />
          ))}
        </div>
      )}
      <div className="flex justify-center items-center pb-16">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={totalPages}
        />
      </div>
    </div>
  );
};

export default AllTripPage;
