import Layout from "../../../components/layout"
import AdminLayout from "../../../components/admin-layout"
import { getSession } from "next-auth/react"

export default function ViewBookings(){
    return(
        <div>
            View Bookings
        </div>
    )
}

ViewBookings.getLayout = function getLayout(page) {
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
  