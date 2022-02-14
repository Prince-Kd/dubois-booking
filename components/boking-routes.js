import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BriefcaseIcon } from "@heroicons/react/outline";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

export default function BookingRoutes() {
  const [showBookingOpts, setShowBookingOpts] = useState(false);
  var router = useRouter();
  var routes = {
    addBooking: "/admin/bookings/add-booking",
    viewBookings: "/admin/bookings/view-bookings",
  };
  return (
    <div
      className={`p-2 py-4 flex flex-col cursor-pointer rounded-md  ${
        showBookingOpts || router.pathname == routes.addBooking || router.pathname == routes.viewBookings  ? `bg-orange-400 mt-2` : ``
      }`}
      onClick={() => setShowBookingOpts(!showBookingOpts)}
    >
      <button
        className={`flex flex-row items-center justify-between ${
          showBookingOpts || router.pathname == routes.addBooking || router.pathname == routes.viewBookings  ? `text-white` : `text-gray-600`
        }`}
      >
          <div className="flex flex-row">
             <BriefcaseIcon className="h-5 w-5 mr-3" />
        Bookings 
          </div>
          <ChevronDownIcon className="h-5 w-5"/>
      </button>
      <div
      onClick={() => setShowBookingOpts(true)}
        className={`px-6 py-2 flex flex-col ${
          showBookingOpts ? `bg-orange-400` : `hidden`
        }`}
      >
        <Link href={routes.addBooking}>
          <div
            onClick={() => setShowBookingOpts(true)}
            className={`${
              router.pathname == routes.addBooking
                ? `text-white`
                : `text-gray-600`
            } p-2  rounded-md flex flex-row items-center cursor-pointer hover:text-white`}
          >
            <a>Add booking</a>
          </div>
        </Link>
        <Link href={routes.viewBookings}>
          <div
            onClick={() => setShowBookingOpts(true)}
            className={`${
              router.pathname == routes.viewBookings
                ? `bg-orange-400 text-white`
                : `text-gray-600`
            } p-2  rounded-md flex flex-row items-center cursor-pointer hover:text-white`}
          >
            <a>View bookings</a>
          </div>
        </Link>
      </div>
    </div>
  );
}
