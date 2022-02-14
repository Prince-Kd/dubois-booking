import { LibraryIcon, UploadIcon } from "@heroicons/react/outline";

export default function DragDropStyle(){
    return(
        <div className="rounded-md border-dashed cursor-pointer border-2 h-52 p-6 border-orange-300 hover:border-orange-500 flex flex-col justify-between items-center">
            <UploadIcon className="h-10 w-10"/>
            <span className="text-orange-400 hover:border-orange-700 text-xl">Drop facility images here or click to upload</span>
            <span>(Note: Main image should be picked first)</span>
        </div>
    )
}