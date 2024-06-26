"use client";

import { createTripRequest, getSingleTrips } from "@/services/homeDataFetching";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FaAnglesRight, FaFlag } from "react-icons/fa6";
import img1 from "/public/gallery/g1.jpg";
import img2 from "/public/gallery/g2.jpg";
import img3 from "/public/gallery/g6.jpg";
import img4 from "/public/gallery/g4.jpg";

import * as Dialog from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { ImCross } from "react-icons/im";
import LoadingComponent from "@/components/Loading/Loading";
import Link from "next/link";
import { UserContext } from "@/UserProvider/UserProvider";
import { getFromLocalStorage } from "@/utils/local-storage";

const SingleTripPage = () => {
  const { id } = useParams();
  const [singleTrip, setSingleTrip] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const userContext = useContext(UserContext);

  const { data } = userContext || {
    data: null,
    setRefetch: () => {},
    isLoading: false,
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleBookNowClick = () => {
    const savedToken = getFromLocalStorage("accessToken");
    if (!savedToken) {
      toast.warning("Need login first!");
      router.push("/login");
    } else {
      setIsDialogOpen(true);
    }
  };

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await getSingleTrips(id as string);
        setSingleTrip(data?.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getData();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      destination: { value: string };
      startDate: { value: string };
      endDate: { value: string };
    };
    const data = {
      name: target.name.value,
      destination: target.destination.value,
      startDate: target.startDate.value,
      endDate: target.endDate.value,
    };

    const res = await createTripRequest(id as string);

    if (res.success) {
      toast.success("Trip request sent successfully!");
      setIsDialogOpen(false);
      router.push("/user/request");
    }
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-0 bg-singlePageSection opacity-75 bg-cover bg-top "></div>
        <div className="relative z-10 py-36 container">
          <p className="flex items-center gap-2 text-gray-300">
            <Link
              className="flex items-center hover:underline gap-1"
              href={"/all-trip"}
            >
              All Trip <FaAnglesRight />
            </Link>
            Trip Details
          </p>
          <h1 className="text-4xl font-bold md:leading-[70px]">
            Explore The Beauty Of World!
          </h1>
        </div>
      </div>

      <div className="flex py-9 gap-5 container">
        <div>
          <Image
            src={img1}
            alt="trip"
            className="rounded-3xl hover:scale-105 transition-all "
          />
        </div>

        <div>
          <Image
            src={img2}
            alt="trip"
            className="rounded-3xl hover:scale-105 transition-all "
          />
        </div>

        <div>
          <Image
            src={img3}
            alt="trip"
            className="rounded-3xl hover:scale-105 transition-all "
          />
        </div>

        <div>
          <Image
            src={img4}
            alt="trip"
            className="rounded-3xl hover:scale-105 transition-all "
          />
        </div>
      </div>

      <div className="container group flex justify-between items-center shadow-[5px_5px_20px_-10px_rgba(255,255,255,0.3),_-5px_-5px_20px_-10px_rgba(255,255,255,0.3)] my-14 rounded-3xl !px-10 py-14 hover:shadow-[#E8604C] transition-all">
        <p className="text-3xl font-semibold group-hover:text-primaryColor transition-all">
          Host Details
        </p>
        <button
          onClick={handleBookNowClick}
          disabled={isLoading}
          className={`bg-[#E8604C] text-white text-sm px-8 py-3 border transition-all ease-in-out duration-300 group-hover:border-red-400 group-hover:text-primaryColor ${
            isLoading
              ? "cursor-not-allowed bg-gray-700 group-hover:!bg-transparent"
              : "hover:bg-transparent group-hover:!bg-transparent"
          }`}
        >
          {isLoading ? "Trip Loading..." : "Book Now Trip"}
        </button>
      </div>

      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="container">
          <div className="flex justify-between group">
            <div>
              <h2 className="sm:text-3xl font-semibold text-lg mb-5">
                Tour Details
              </h2>
              <h2 className="font-semibold text-lg">
                Trip Name Or Destination
              </h2>
              <p className="pt-2 text-lg flex items-center gap-1">
                Trip Name is{" "}
                <mark className="px-2 bg-red-500 text-white">
                  {singleTrip?.title}
                </mark>{" "}
                and Destination{" "}
                <mark className="px-2 bg-red-500 text-white flex items-center gap-2 w-fit">
                  {singleTrip?.destination} <FaFlag />
                </mark>
              </p>

              <ul className="text-lg py-4 flex gap-5">
                <li>
                  <span className="border-b border-red-400">Start Date</span> :{" "}
                  {singleTrip?.startDate}
                </li>
                <li>
                  <span className="border-b border-red-400">End Date</span> :{" "}
                  {singleTrip?.endDate}
                </li>
                <li>
                  <span className="border-b border-red-400">Trip Budget</span> :{" "}
                  ${singleTrip?.budget}
                </li>
              </ul>
            </div>
            <div className="h-[230px] w-[450px] overflow-hidden rounded-2xl">
              <Image
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-125"
                src={singleTrip?.image}
                width={200}
                height={200}
                alt="image"
              />
            </div>
          </div>
          <div className="space-y-6">
            <p className="font-semibold text-lg">About This Experience</p>
            <p>{singleTrip?.description}</p>

            <p className="font-semibold text-lg">Our Activities!</p>

            <div className="flex gap-20">
              <div>
                <p className="font-semibold text-lg pb-1">Activities: </p>
                <div className="pl-6">
                  {singleTrip?.activities?.map((a: string, i: string) => (
                    <li key={i}>{a}</li>
                  ))}
                </div>
              </div>
            </div>

            <p className="font-semibold text-lg mb-4">
              Tour Type: {singleTrip?.tripType}
            </p>

            <div>
              <p className="font-semibold text-lg mb-4">What we will do?</p>
              <p className="text-sm">
                MAKE SURE TO BOOK WELL IN ADVANCE. <br />
                Once you’ve arrived at the Jump Zone, let the experience begin!
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center mb-14">
        <button
          onClick={handleBookNowClick}
          disabled={isLoading}
          className={`bg-[#E8604C] text-white text-sm px-8 py-3 border transition-all ease-in-out duration-300 hover:border-red-400 hover:text-primaryColor ${
            isLoading
              ? "cursor-not-allowed bg-gray-700 hover:!bg-transparent "
              : "hover:bg-transparent hover:border-red-400 hover:text-primaryColor"
          }`}
        >
          {isLoading ? "Trip Loading..." : "Book Now Trip"}
        </button>
      </div>

      <div className="my-16 bg-gray-900 p-14">
        <div className="container">
          <h2 className="sm:text-3xl font-semibold text-lg mb-6">
            Briefing: Understand the buggy and safety procedure
          </h2>

          <ul className="space-y-4 list-outside list-disc">
            <li>
              Disclaimer Form: Sign the disclaimers stating that you have read
              our terms and conditions and informed the crew of any medical
              conditions, and meet our set requirements for the tandem bungy
              jumping.
            </li>

            <li>
              Store your belongings: You will need to empty your pockets and
              store your valuables at the reception so as to have a smooth and
              clutter-free swing.
            </li>

            <li>
              Get harnessed: A minimum of 3 safety checks are done before you
              jump Due to the different process of the Jump from the Bungy, the
              Giant Swing in India allows you to enjoy double the freefall of
              the Bungy, with considerably more speed, and almost as much fear.
            </li>

            <li>
              After the Giant Swing, jumpers are lowered down to a drop zone in
              the river which has only 2 ft of water. Pin on the Got Guts badge
              on completion of your activity and claim your Dare-to-Jump
              certificate!
            </li>

            <li>
              Walk back up to the cafeteria and claim your Dare to Jump
              Certificate, while enjoying your video.
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-center mb-14">
          <button
            onClick={handleBookNowClick}
            disabled={isLoading}
            className={`bg-[#E8604C] text-white text-sm px-8 py-3 border transition-all ease-in-out duration-300 ${
              isLoading
                ? "cursor-not-allowed bg-gray-700 hover:!bg-transparent hover:border-red-400 hover:text-primaryColor"
                : "hover:bg-transparent hover:border-red-400 hover:text-primaryColor "
            }`}
          >
            {isLoading ? "Trip Loading..." : "Book Now Trip"}
          </button>
        </div>

        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Trigger asChild>
            <button id="dialog-trigger" style={{ display: "none" }}>
              Open Dialog
            </button>
          </Dialog.Trigger>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-70" />
          <Dialog.Content className="fixed z-50 top-2/4 left-2/4 w-[90vw] max-w-3xl -translate-x-2/4 -translate-y-2/4 transform rounded-lg bg-white p-6 focus:outline-none">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-2xl text-black font-bold">
                Trip Request
              </Dialog.Title>
              <ImCross
                onClick={() => setIsDialogOpen(false)}
                size={20}
                className="mb-4 cursor-pointer"
                color="#000"
              />
            </div>
            <Dialog.Description className="text-gray-800 pb-6 font-semibold">
              I travel so my life isn’t disrupted by routine.
            </Dialog.Description>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-black">Your Name</label>
                  <input
                    className="block w-full rounded-xl text-black border border-gray-400 p-3 shadow-sm placeholder:text-black/60 focus:border-[#e44d36] focus:outline-none focus:!text-primaryColor focus:ring-[#e44d36] sm:text-sm"
                    type="text"
                    name="name"
                    autoComplete="off"
                    id="name"
                    value={data?.name}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-black">Your Email</label>
                  <input
                    className="block w-full rounded-xl text-black border border-gray-400 p-3 shadow-sm placeholder:text-black/60 focus:border-[#e44d36] focus:outline-none focus:!text-primaryColor focus:ring-[#e44d36] sm:text-sm"
                    type="text"
                    name="name"
                    autoComplete="off"
                    id="name"
                    value={data?.email}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-4 py-3">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-black">Trip Name</label>
                  <input
                    className="block w-full rounded-xl text-black border border-gray-400 p-3 shadow-sm placeholder:text-black/60 focus:border-[#e44d36] focus:outline-none focus:!text-primaryColor focus:ring-[#e44d36] sm:text-sm"
                    type="text"
                    name="name"
                    autoComplete="off"
                    id="name"
                    value={singleTrip?.title}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-black">Trip Budget</label>
                  <input
                    className="block w-full rounded-xl text-black border border-gray-400 p-3 shadow-sm placeholder:text-black/60 focus:border-[#e44d36] focus:outline-none focus:!text-primaryColor focus:ring-[#e44d36] sm:text-sm"
                    type="text"
                    name="name"
                    autoComplete="off"
                    id="name"
                    value={`$${singleTrip?.budget}`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="destination" className="text-black">
                  Trip Destination
                </label>
                <input
                  className="block w-full rounded-xl text-black border border-gray-400 p-3 shadow-sm placeholder:text-black/60 focus:border-[#e44d36] focus:outline-none focus:!text-primaryColor focus:ring-[#e44d36] sm:text-sm"
                  type="destination"
                  name="destination"
                  id="destination"
                  autoComplete="off"
                  value={singleTrip?.destination}
                />
              </div>
              <div className="flex justify-between items-center gap-4 py-3">
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="startDate" className="text-black">
                    Trip Start Date
                  </label>
                  <input
                    className="block w-full rounded-xl text-black border border-gray-400 p-3 shadow-sm placeholder:text-black/60 focus:border-[#e44d36] focus:outline-none focus:!text-primaryColor focus:ring-[#e44d36] sm:text-sm"
                    type="text"
                    name="startDate"
                    id="startDate"
                    autoComplete="off"
                    value={singleTrip?.startDate}
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="endDate" className="text-black">
                    Trip End Date
                  </label>
                  <input
                    className="block w-full rounded-xl text-black border border-gray-400 p-3 shadow-sm placeholder:text-black/60 focus:border-[#e44d36] focus:outline-none focus:!text-primaryColor focus:ring-[#e44d36] sm:text-sm"
                    type="text"
                    name="endDate"
                    id="endDate"
                    autoComplete="off"
                    value={singleTrip?.endDate}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 text-black mt-2">
                <input
                  className="size-5"
                  type="checkbox"
                  id="myCheckbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="myCheckbox"
                  className="ml-2 hover:underline cursor-pointer"
                >
                  Accept terms and conditions
                </label>
              </div>

              <button
                disabled={!isChecked}
                type="submit"
                className={`mt-5 px-12 py-2 text-lg font-semibold rounded transition-all duration-300 ${
                  isChecked
                    ? "bg-[#E8604C] text-white hover:bg-black"
                    : "bg-gray-300 text-gray-700 cursor-not-allowed"
                }`}
              >
                Send Trip Request
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default SingleTripPage;
