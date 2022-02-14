import { useRouter } from "next/router";
import { useState } from "react";
import swal from "sweetalert";
import Spinner from "../../components/spinner";

export default function AdminSignup() {
  var router = useRouter();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setLoading] = useState(false);

  const [confirmError, setConfirmError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setConfirmError(true);
    } else {
      setConfirmError(false);
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      setLoading(false);

      //Await for data for any desirable next steps
      switch (res.status) {
        case 200:
          console.log(res);
          router.push("/admin/login");
          break;
        case 422:
          console.log(res);
          swal("Error", res.json().message, "error");
        default:
            console.log(res)
            swal('Error', )
      }
      // const data = res.body;
      // console.log(data);
    }
    //POST form values
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="h-screen w-screen flex bg-gray-50">
        <div className="w-1/3 m-auto flex flex-col p-16 shadow-md bg-white">
          <div>
            <h1 className="text-xl font-semibold flex text-center mb-5">
              Admin Signup
            </h1>
          </div>
          <label htmlFor="firstname">Firstname:</label>
          <div className=" border-2 rounded-md h-12 mb-4 flex flex-row justify-center">
            {/* <div className='h-full flex justify-center'><MailIcon className='h-8 w-8 text-gray-300' /></div> */}
            <input
              required
              id="firstname"
              name="firstname"
              className=" w-full h-full px-3"
              placeholder="Firstname"
              onChange={(e) => setUser(user => ({...user, firstname: e.target.value }))}
            />
          </div>
          <label htmlFor="lastname">Lastname:</label>
          <div className=" border-2 rounded-md h-12 mb-4 flex flex-row justify-center">
            {/* <div className='h-full flex justify-center'><MailIcon className='h-8 w-8 text-gray-300' /></div> */}
            <input
              required
              id="lastname"
              name="lastname"
              onChange={(e) => setUser(user => ({...user, lastname: e.target.value }))}
              className=" w-full h-full px-3"
              placeholder="Lastname"
            />
          </div>
          <label htmlFor="email">Email:</label>
          <div className=" border-2 rounded-md h-12 mb-4 flex flex-row justify-center">
            {/* <div className='h-full flex justify-center'><MailIcon className='h-8 w-8 text-gray-300' /></div> */}
            <input
              required
              id="email"
              name="email"
              onChange={(e) => setUser(user => ({...user, email: e.target.value }))}
              className=" w-full h-full px-3"
              placeholder="abc@example.com"
            />
          </div>
          <label htmlFor="phone">Phone:</label>
          <div className=" border-2 rounded-md h-12 mb-4 flex flex-row justify-center">
            {/* <div className='h-full flex justify-center'><MailIcon className='h-8 w-8 text-gray-300' /></div> */}
            <input
              required
              id="phone"
              name="phone"
              onChange={(e) => setUser(user => ({...user, phone: e.target.value }))}
              className=" w-full h-full px-3"
              placeholder="Phone number"
            />
          </div>
          <label htmlFor="password">Password:</label>
          <div className=" border-2 rounded-md h-12 mb-4 flex flex-row justify-center">
            {/* <div className='h-full flex justify-center'><MailIcon className='h-8 w-8 text-gray-300' /></div> */}
            <input
              required
              id="password"
              name="password"
              type={"password"}
              onChange={(e) => setUser(user => ({...user, password: e.target.value }))}
              className=" w-full h-full px-3"
            />
          </div>
          <div id="password-error"></div>
          <label htmlFor="confirm-password">Confirm password:</label>
          <div className=" border-2 rounded-md h-12  mb-4 flex flex-row justify-center">
            {/* <div className='h-full flex justify-center'><MailIcon className='h-8 w-8 text-gray-300' /></div> */}
            <input
              required
              type={"password"}
              id="confirm-password"
              name="confirm-password"
              onChange={(e) => setUser(user => ({...user, confirmPassword: e.target.value}))}
              className=" w-full h-full px-3"
            />
          </div>
          <div
            id="confirm-password-error"
            className={confirmError ? `text-red-500 text-sm  mb-4` : `hidden  mb-4`}
          >
            Passwords don't match
          </div>
          <button
            type={"submit"}
            className="rounded-md h-12 flex items-center justify-center bg-blue-500 text-lg text-white hover:bg-blue-600 cursor-pointer"
          >
            {isLoading ? (
              <div className="flex flex-row items-center justify-center text-white text-lg">
                <Spinner />
                <div>Loading...</div>
              </div>
            ) : (
              <div className="text-lg text-white">Signup</div>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
