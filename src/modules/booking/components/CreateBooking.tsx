import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { Booking } from "../interfaces/booking";
import { createBooking } from "../requests/requests";
import {AuthContext} from "../../auth/components/AuthContext";
import {getLessonList} from "../../lesson/requests/requests";

const CreateBooking = () => {
  const { user } = useContext(AuthContext);
  const [lessonName, setLessonName] = useState<string[]>([])
  const navigate = useNavigate();
  const bookingFromLesson = useLocation().state || ""
  const [data, setData] = useState<Booking>({bookingUser: user, lessonName: bookingFromLesson, phoneNumber: ""});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // save the data in a state
    createBooking(data);
    navigate("/booking", { state: { data }, replace: true });

    // refresh for new item
    window.location.reload();
  };

  useEffect(() => {
    getLessonList("")
        .then(response => {
          const newLessonNames = response.data.map((lesson) => (lesson.lessonName));
          setLessonName(newLessonNames);
        });
  }, []);

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
              disabled={true}
              value={user}
              onSubmit={(event) => setData({ ...data, bookingUser: user })}
            />
          </div>

          <div className={"mb-4"}>
            <label className={"block text-gray-500 text-sm font-bold mb-2"}>
              Item
            </label>
            <select
                className={"border rounded w-full "}
                value={data?.lessonName}
                onChange={(event) => setData({ ...data, lessonName: event.target.value })}
            >
              <option value="">--- Choose Lesson ---</option>
              {lessonName.map( (lesson, key) => (
                <option key={key} value={lesson}>{lesson}</option>
              ))}
            </select>
          </div>

          <div className={"mb-4"}>

            <label className={"block text-gray-500 text-sm font-bold mb-2"}>
              Phone
            </label>
            <input
              className={"border rounded w-full "}
              type="text"
              placeholder="Phone"
              value={data?.phoneNumber || ""}
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

export { CreateBooking };
