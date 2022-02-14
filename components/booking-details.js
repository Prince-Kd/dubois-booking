import { useState } from "react";

export default function BookingDetails() {
  const [bookings, setBookings] = useState([]);
  return (
    <div className="flex flex-col w-full rounded-xl bg-white shadow-md p-6">
      <h1 className="text-lg font-medium ">Booking details</h1>
      <hr className="mb-2" />
      <table class="table-auto">
        <thead>
          <tr className="text-orange-600">
            <th>No</th>
            <th>Name</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Status</th>
            <th>Facility</th>
            <th>Edit</th>
          </tr>
        </thead>
          {
            bookings.map((booking) => {
                return(
                    <tbody>

                    </tbody>
                )
            }) 
          }
      </table>
      <div className={`mt-4 flex flex-row justify-center items-center w-full ${bookings.length > 0 ? 'hidden' : ''}`}>No bookings availble</div>
    </div>
  );
}


