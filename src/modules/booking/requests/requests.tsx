import axios, { AxiosResponse } from "axios";
import { Booking } from "../interfaces/booking";
import { BookingRequestEnum } from "../enum/bookingRequestEnum";
import { ListResponseModel } from "../../common/interfaces/ListResponseModel";

const getBookingList = (query: string, page: string, size: string, orderBy: string, direction: string): Promise<ListResponseModel<Booking>> => {
  return axios
    .get<ListResponseModel<Booking>>(`${BookingRequestEnum.API_URL}${BookingRequestEnum.GET_BOOKING_LIST_URL}?filter_user=${query}&page=${page}&size=${size}&orderBy=${orderBy}&direction=${direction}`)
    .then((response: AxiosResponse<ListResponseModel<Booking>>) => response.data);
};

const getBookingById = (id?: number): Promise<string> => {
  return axios
    .post<string>(BookingRequestEnum.API_URL + BookingRequestEnum.GET_BOOKING_BY_ID + id)
    .then((response: AxiosResponse<string>) => response.data);
};

const createBooking = (data?: Booking): Promise<string> => {
  return axios
    .post<string>(BookingRequestEnum.API_URL + BookingRequestEnum.CREATE_BOOKING_URL, data)
    .then((response: AxiosResponse<string>) => response.data);
};

const updateBooking = (booking?: Booking, id?: number): Promise<string> => {
  return axios
    .post<string>(BookingRequestEnum.API_URL + BookingRequestEnum.UPDATE_BOOKING_URL + id, booking)
    .then((response: AxiosResponse<string>) => response.data);
};

const deleteBooking = (id?: number): Promise<string> => {
  return axios
    .post<string>(BookingRequestEnum.API_URL + BookingRequestEnum.DELETE_BOOKING_URL + id)
    .then((response: AxiosResponse<string>) => response.data);
};

const getRecommendedLessons = (userName?: string): Promise<string[]> => {
  return axios
    .get<string[]>(`${BookingRequestEnum.API_URL}${BookingRequestEnum.RECOMMEND_LESSON_URL}?user_name=${userName}`)
    .then((response: AxiosResponse<string[]>) => response.data);
}
export { getBookingList, getBookingById, createBooking, updateBooking, deleteBooking, getRecommendedLessons };