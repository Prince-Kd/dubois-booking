import { SearchIcon } from "@heroicons/react/outline";
import Image from "next/image";

export default function AdminHeader() {
  return (
    <div className="flex flex-row justify-between items-center h-16 px-6 shadow-md w-full">
      <div className="relative h-10 rounded-full border-gray-300 border-2 focus:border-orange-400  focus:border-2">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-500" />
        </div>
        <input placeholder="Search" className="h-full  pl-9 pr-12 rounded-full w-full focus:border-2 focus:border-orange-400 " />
      </div>
      <div className="">
          <Image src={'/images/me1.jpeg'} height={40} width={40} className='rounded-full' />
      </div>
    </div>
  );
}
