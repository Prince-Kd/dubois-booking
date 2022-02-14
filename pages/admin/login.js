import { useRouter } from "next/router";
import { useState } from 'react';
import Swal from 'sweetAlert';
import { signIn, useSession } from "next-auth/react"
import Spinner from "../../components/spinner";


export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { data: session } = useSession()

  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    setIsLoading(false)
    if (!result.error) {
      // set some auth state
      router.replace("/admin/dashboard");
    }else if(result.error){
        Swal('Error', result.error, 'error');
    }
  }

  return (
    <div className="h-screen w-screen flex bg-gray-50">
      <form onSubmit={submitHandler} className="w-1/3 m-auto flex flex-col p-16 shadow-md bg-white">
          <div>
            <h1 className="text-xl font-semibold flex text-center mb-5">
              Admin Login
            </h1>
          </div>
          <label htmlFor="email">Email:</label>
          <div className=" border-2 rounded-md h-12 mb-4 flex flex-row justify-center">
            {/* <div className='h-full flex justify-center items-center'><MailIcon className='h-8 w-8 text-gray-300' /></div> */}
            <input
              id="email"
              name="email"
              className=" w-full h-full px-3"
              placeholder="abc@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label htmlFor="password">Password:</label>
          <div className=" border-2 rounded-md h-12 mb-4 flex flex-row justify-center">
            {/* <div className='h-full flex justify-center'><MailIcon className='h-8 w-8 text-gray-300' /></div> */}
            <input
              id="password"
              name="password"
              type={"password"}
              className=" w-full h-full px-3"
              onChange={(e) => setPassword(e.target.value)}
            />
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
              <div className="text-lg text-white">Login</div>
            )}
          </button>
          {/* <input
          type={"submit"}
          value={isLoading ? "Loading..." : "Login"}
          className="rounded-md h-12 flex items-center justify-center bg-blue-500 text-lg text-white hover:bg-blue-600 cursor-pointer"
        /> */}
      </form>
    </div>
  );
}

