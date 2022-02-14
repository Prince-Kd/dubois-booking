import { useState } from "react";
import BookingLayout from "../../components/booking-layout";
import Layout from "../../components/layout";
import Spinner from "../../components/spinner";

export default function Booking() {
  const today = new Date().toLocaleDateString('en-CA');
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(today);
  const [fromTime, setFromTime] = useState(new Date().getTime());
  const [toTime, setToTime] = useState();

  console.log(today)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);

  } 

  return (
    <div className="flex flex-col h-full  w-screen p-auto" style={{}}>
      <div className="shadow-md p-8 flex flex-col mx-auto mt-40">
        <h1>Availability search</h1>
        <hr />
        <form onSubmit={handleSubmit} className="flex flex-row items-center justify-around mt-4">
          <div className="flex flex-col mx-4">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              value={date}
              //defaultValue={today}
              onChange={(e) => setDate(e.target.value)}
              type={"date"}
              className="bg-gray-300 rounded-sm p-2 h-12 "
            />
          </div>
          {/* <div className="flex flex-col mx-4">
            <label htmlFor="fromTime">From</label>
            <input
              id="fromTime"
              type={"time"}
              onChange={(e) => setFromTime(e.target.value)}
              className="bg-gray-300 rounded-sm p-2 h-12 "
            />
          </div>
          <div className="flex flex-col mx-4">
            <label htmlFor="toTime">To</label>
            <input
              id="toTime"
              type={"time"}
              onChange={(e) => setToTime(e.target.value)}
              className="bg-gray-300 rounded-sm p-2 h-12 "
            />
          </div> */}

          <button
            type={"submit"}
            className="bg-orange-500 rounded-sm p-3 h-12 mx-4 mt-6 cursor-pointer hover:bg-orange-600"
          >
            {isLoading ? (
              <div className="flex flex-row items-center justify-center text-white text-lg">
                <Spinner />
                <div>Checking...</div>
              </div>
            ) : (
              <div className="text-lg text-white">Check availability</div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

Booking.getLayout = function getLayout(page) {
  return (
    <Layout>
      <BookingLayout>{page}</BookingLayout>
    </Layout>
  );
};
