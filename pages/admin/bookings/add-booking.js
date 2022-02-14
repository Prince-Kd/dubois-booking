import Layout from "../../../components/layout"
import AdminLayout from "../../../components/admin-layout"
import { getSession } from "next-auth/react"

export default function AddBooking(){
    return(
        <div className=" p-8 flex flex-col h-full">
            <h1 className="text-2xl font-semibold">ADD BOOKING DETAILS</h1>
            <form className="rounded-md mt-16 flex flex-col p-6 shadow-md">
              <h2>Enter facility details</h2>
              <input type={'text'} className=" form-input " />

            </form>
        </div>
    )
}

AddBooking.getLayout = function getLayout(page) {
    return (
      <Layout>
        <AdminLayout>{page}</AdminLayout>
      </Layout>
    )
  }

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
  