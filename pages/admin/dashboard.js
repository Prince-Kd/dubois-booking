import Layout from "../../components/layout";
import AdminLayout from "../../components/admin-layout";
import StatCard from "../../components/stat-card";
import BookingDetails from "../../components/booking-details";
import { useSession, getSession } from "next-auth/react";

export default function Dashboard() {
  const {data: session} = useSession();
  console.log(session)
  return (
    <div className="flex flex-col h-full p-8 bg-gray-50">
      <h1 className="text-lg font-medium mb-2">Overview</h1>
      <div
        id="overview"
        className="w-full flex flex-row justify-between items-center mb-6"
      >
        <StatCard />
        <StatCard />
        <StatCard />
      </div>
      <BookingDetails />
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
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
