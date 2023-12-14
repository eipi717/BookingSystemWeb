import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Booking } from "../interfaces/booking";
import { updateBooking } from "../requests/requests";

const EditBooking = () => {
  const navigate = useNavigate();

  const selectedBooking: Booking = useLocation().state;

  const [data, setData] = useState<Booking>(selectedBooking);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // save the data in a state

    console.log(data);

    updateBooking(data, data?.bookingId);
    navigate("/booking");

    // refresh for new item
    window.location.reload();
  };

  return (
    <div className={"flex justify-center "}>
      <div className={"w-full max-w-screen-2xl "}>
        <form className={"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"} onSubmit={handleSubmit}>
          <div className={"mb-4"}>

            <label className={"block text-gray-500 text-sm font-bold mb-2"}>
              Username
            </label>
            <input
              className={"border rounded w-full "}
              type="text"
              placeholder="User"
              defaultValue={selectedBooking.bookingUser}
              onChange={(event) => setData({ ...data, bookingUser: event.target.value })}
            />
          </div>


          <div className={"mb-4"}>

            <label className={"block text-gray-500 text-sm font-bold mb-2"}>
              Phone
            </label>
            <input
              className={"border rounded w-full "}
              type="text"
              placeholder="Phone"
              defaultValue={selectedBooking.phoneNumber}
              onChange={(event) => setData({ ...data, phoneNumber: event.target.value })}
            />
          </div>

          <div className={"flex justify-center"}>
            <button
              className={"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"}
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { EditBooking };
