import Link from "next/link";
import { useRouter } from "next/router";
import { Listbox, Transition } from "@headlessui/react";
import { useState } from "react";
import BookingRoutes from "./boking-routes";
import { HomeIcon } from "@heroicons/react/outline";
import FacilityRoutes from "./facility-routes";
import { signOut } from "next-auth/react";
import swal from "sweetalert";
import Spinner from "./spinner";

export default function AdminSidebar() {
  const [loading, setLoading] = useState(false);
  var router = useRouter();
  var routes = {
    dashboard: "/admin/dashboard",
    addRoom: "/admin/rooms/add-room",
    viewRooms: "/admin/rooms/view-rooms",
  };
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-orange-300  p-4 relative">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-orange-500">
          DU-BOIS CENTER
        </h1>
      </div>
      <div className="flex flex-col ">
        <Link href={routes.dashboard}>
          <div
            className={`${
              router.pathname == routes.dashboard
                ? `bg-orange-400 text-white`
                : `text-gray-600`
            } p-2 py-4  rounded-md flex flex-row items-center cursor-pointer`}
          >
            <HomeIcon className="h-5 w-5 mr-3" />
            <a>Dashboard</a>
          </div>
        </Link>
        <BookingRoutes />
        <FacilityRoutes />
      </div>
      <div className="flex flex-col items-stretch justify-end flex-1 mb-40">
        <button
          className="text-white p-2 rounded-md flex justify-center items-center cursor-pointer bg-orange-500 hover:bg-orange-600"
          onClick={() => {
            setLoading(true);
            swal({
              title: "Log out?",
              text: "Do you want to logout?",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then(async (logout) => {
              if (logout) {
                await signOut({ callbackUrl: "/admin/login" });
                setLoading(false);
              } else {
                setLoading(false);
                return;
              }
            });
          }}
        >
          {loading ? <Spinner /> : "Sign out"}
        </button>
      </div>
    </div>
  );
}
