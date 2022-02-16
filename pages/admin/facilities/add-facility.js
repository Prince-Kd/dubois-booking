import Layout from "../../../components/layout";
import AdminLayout from "../../../components/admin-layout";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function AddFacility() {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("Indoors");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [fileError, setFileError] = useState(false);

  const fileTypes = ["JPG", "PNG", "JPEG"];

  useEffect(() => {
    console.log(files);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (files.length != 0) {
      const data = {
        name,
        type,
        price,
        description,
        capacity,
        files,
      };
      console.log(data);
      setIsLoading(false);
    } else {
      setFileError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 flex flex-col h-full overflow-scroll">
      <h1 className="text-2xl font-semibold">Add facility details</h1>
      <form
        onSubmit={handleSubmit}
        className="rounded-md mt-16 flex flex-col p-6 shadow-md"
      >
        <h2 className="text-xl font-semibold mb-2">Enter facility details</h2>
        <div className="grid grid-cols-2 space-x-6 mt-1 mb-4">
          <div className="flex flex-col">
            <label>Facility name:</label>
            <input
              required
              onChange={(e) => setName(e.target.value)}
              type={"text"}
              className=" form-input rounded-md "
              placeholder="Facility name"
            />
          </div>
          <div className="flex flex-col">
            <label>Facility type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className=" form-input rounded-md"
              placeholder="Facility type"
            >
              <option value={"Indoors"}>Indoors</option>
              <option value={"Outdoors"}>Outdoors</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 space-x-6">
          <div className="flex flex-col">
            <label>Capacity</label>
            <input
              onChange={(e) => setCapacity(e.target.value)}
              type={"number"}
              className=" form-input rounded-md mt-1 mb-4"
              placeholder="Facility capacity"
            />
          </div>
          <div className="flex flex-col">
            <label>Price</label>
            <div className="rounded-md mt-1 mb-4 w-full relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">GHC</span>
              </div>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type={"text"}
                className=" form-input rounded-md pl-12"
                placeholder="Facility price"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label>Description</label>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="rounded-md mt-1 mb-4 h-32"
            placeholder="Facility description"
          ></textarea>
        </div>
        <label>Upload facility photos</label>
        <div className="flex">
          <FileUploader
            handleChange={(file) => {
              const results = Object.values(file);
              setFileError(false)
              setFiles(results);
            }}
            files
            name="file"
            multiple={true}
            types={fileTypes}
          />
          <div
            className={`text-red-500 text-sm ml-4 ${
              fileError ? "" : "hidden"
            } `}
          >
            Add at least one image
          </div>
          <div className="flex flex-col">
            <div className="ml-4 italic text-gray-500">{}</div>
            {files.map((file, index) => (
              <div className="ml-4 italic text-gray-600">{`${index + 1}. ${
                file.name
              }`}</div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 space-x-10 mt-4 mx-20">
          <button
            className="p-3 rounded-md mt-1 mb-4 bg-green-500 text-white"
            type={"submit"}
          >
            {isLoading ? (
              <div className="flex flex-row items-center justify-center text-white text-lg">
                <Spinner />
                <div>Loading...</div>
              </div>
            ) : (
              <div className="text-lg text-white">Submit</div>
            )}
          </button>
          <input
            className=" form-input rounded-md mt-1 mb-4 bg-red-500 text-white"
            type={"submit"}
            value="Cancel"
          />
        </div>
      </form>
    </div>
  );
}

AddFacility.getLayout = function getLayout(page) {
  return (
    <Layout>
      <AdminLayout>{page}</AdminLayout>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
