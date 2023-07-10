import React, { useContext, useEffect, useState } from "react";
import { Booking } from "../interfaces/booking";
import { deleteBooking, getBookingList } from "../requests/requests";
import { TableClassEnum } from "../enum/tableClassEnum";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../auth/components/AuthContext";
import { Paginator } from "../../common/components/Paginator";

const BookingTable = () => {

    const [bookingList, setBookingList] = useState<Booking[]>([]);

    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const { user } = useContext(AuthContext)

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [totalPage, setTotalPage] = useState<number>(1);

    const navigate = useNavigate();

    const [orderBy, setOrderBy] = useState<string>("")


    const SIZE = 10;

    useEffect(() => {
        getBookingList(user, currentPage.toString(), SIZE.toString(), orderBy, "desc")
          .then(res => {
              setBookingList(res.data);
              setTotalPage(res.numberOfPages)
          });
    }, [currentPage, orderBy, user]);

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>, booking: Booking) => {
        const bookingId = booking?.bookingId ?? 0;
        if (e.target.checked) {
            setSelectedRows([...selectedRows, bookingId]);
        } else {
            setSelectedRows(selectedRows.filter((id) => id !== bookingId));
        }
    };

    const handleEdit = (booking: Booking) => {
      navigate(`/booking/editBooking/${booking?.bookingId ?? 0}`, { state: booking });
    };

    const handleDelete = (id: number) => {
        deleteBooking(id);
        window.location.reload();
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    return (
      <>
          <div className={"flex justify-end pr-3 py-2"}>
              <select className={"bg-gray-200 opacity-60 mr-2 rounded"} style={{ textAlign: "center" }}
              onChange={(e) => {setOrderBy(e.target.value)}}
              >
                  <option value="" > Sort By </option>
                  <option value="bookingId">ID</option>
                  {/*<option value="createTs">Booking Time</option>*/}
                  <option value="lesson">Lesson ID</option>
                  <option value="phone">Phone</option>
              </select>
              <button
                onClick={() => {
                  navigate("/booking/createBooking");
                }}
                className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded"}>
                  Create Booking
              </button>
          </div>
          <div className={`overflow-x-auto ${TableClassEnum.CardTagClass}`}>
              <div className={"md:w-auto rounded shadow-lg"}>
                  <div className={"className=\"rounded-lg p-1"}>
                      <table className={`${TableClassEnum.tableTagClass}`}>
                          <thead className={`${TableClassEnum.threadTagClass}`}>
                          <tr>
                              <th className="w-4 p-4"></th>
                              <th className="px-4 py-2 w-24">ID</th>
                              <th className="px-4 py-2">Lesson Name</th>
                              <th className="px-4 py-2">Phone</th>
                              <th className="px-4 py-2">Price</th>
                              <th className="px-4 py-2">Created At</th>
                              <th className="px-4 py-2">Last Update At</th>
                              <th className="px-4 py-2">Action</th>
                          </tr>
                            </thead>
                            <tbody>
                            {bookingList.map(booking => (
                                <tr key={booking.bookingId} className={`${TableClassEnum.tableTagClass}`}>
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox"
                                                   className={`${TableClassEnum.checkBoxTagClass}`}
                                                   onChange={(e) => handleSelect(e, booking)}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 ">{booking.bookingId}</td>
                                    <td className="px-6 py-4 ">{booking.lessonName}</td>
                                    <td className="px-6 py-4">{booking.phoneNumber}</td>
                                    <td className="px-6 py-4 ">${booking.lessonPrice}</td>
                                    <td className="px-6 py-4">{booking.createTs}</td>
                                    <td className="px-6 py-4">{booking.updateTs}</td>
                                    <td className="px-6 py-4">
                                        {selectedRows.includes(booking?.bookingId ?? 0) ? (
                                          <button
                                            onClick={() => {
                                                handleDelete(booking?.bookingId ?? 0);
                                            }}
                                            className={`bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
                                          >
                                              Delete
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() => {
                                                handleEdit(booking);
                                            }}
                                            className={`bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded`}
                                          >
                                              Edit
                                          </button>
                                        )}
                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
              <Paginator currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange}/>
            </div>
        </>
    )
}

export {BookingTable}