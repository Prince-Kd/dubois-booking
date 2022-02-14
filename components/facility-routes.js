import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronDownIcon, OfficeBuildingIcon } from "@heroicons/react/outline";
import { Listbox, Transition } from "@headlessui/react";

export default function FacilityRoutes() {
    const [showFacilityOpts, setShowFacilityOpts] = useState(false);
  var router = useRouter();
  var routes = {
    addFacility: "/admin/facilities/add-facility",
    viewFacilities: "/admin/facilities/view-facilities",
  };
  return (
    <div
      className={`p-2 py-4 flex flex-col cursor-pointer rounded-md  ${
        showFacilityOpts || router.pathname == routes.addFacility || router.pathname == routes.viewFacilities  ? `bg-orange-400 mt-2` : ``
      }`}
      onClick={() => setShowFacilityOpts(!showFacilityOpts)}
    >
      <button
        className={`flex flex-row items-center justify-between ${
            showFacilityOpts || router.pathname == routes.addFacility || router.pathname == routes.viewFacilities  ? `text-white` : `text-gray-600`
        }`}
      >
        <div className="flex flex-row ">
          <OfficeBuildingIcon className="h-5 w-5 mr-3" />
          Facilities
        </div>
        <ChevronDownIcon className="h-5 w-5 " />
      </button>
      <div
      onClick={() => setShowFacilityOpts(true)}
        className={`px-6 py-2 flex flex-col ${
            showFacilityOpts ? `bg-orange-400` : `hidden`
        }`}
      >
        <Link href={routes.addFacility}>
          <div
            onClick={() => setShowFacilityOpts(true)}
            className={`${
              router.pathname == routes.addFacility
                ? `text-white`
                : `text-gray-600`
            } p-2  rounded-md flex flex-row items-center cursor-pointer hover:text-white`}
          >
            <a>Add facility</a>
          </div>
        </Link>
        <Link href={routes.viewFacilities}>
          <div
            onClick={() => setShowFacilityOpts(true)}
            className={`${
              router.pathname == routes.viewFacilities
                ? `bg-orange-400 text-white`
                : `text-gray-600`
            } p-2  rounded-md flex flex-row items-center cursor-pointer hover:text-white`}
          >
            <a>View facilities</a>
          </div>
        </Link>
      </div>
    </div>
  );
}
