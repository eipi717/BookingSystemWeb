import axios, { AxiosResponse } from "axios";
import { Lesson } from "../interfaces/lesson";
import { LessonRequestEnum } from "../enum/lessonRequestEnum";
import { ListResponseModel } from "../../common/interfaces/ListResponseModel";

const getLessonList = (query: string): Promise<ListResponseModel<Lesson>> => {
  return axios
    .get<ListResponseModel<Lesson>>(LessonRequestEnum.API_URL + LessonRequestEnum.GET_LESSON_LIST_URL)
    .then((response: AxiosResponse<ListResponseModel<Lesson>>) => response.data);
};

const getLessonById = (id?: number): Promise<string> => {
  return axios
    .post<string>(LessonRequestEnum.API_URL + LessonRequestEnum.GET_LESSON_BY_ID_URL + id)
    .then((response: AxiosResponse<string>) => response.data);
};

const createLesson = (data?: Partial<Lesson>): Promise<string> => {
  return axios
    .post<string>(LessonRequestEnum.API_URL + LessonRequestEnum.CREATE_LESSON_URL, data)
    .then((response: AxiosResponse<string>) => response.data);
};

const updateLesson = (Lesson?: Lesson, id?: number): Promise<string> => {
  return axios
    .post<string>(LessonRequestEnum.API_URL + LessonRequestEnum.UPDATE_LESSON_URL + id, Lesson)
    .then((response: AxiosResponse<string>) => response.data);
};

const deleteLesson = (id?: number): Promise<string> => {
  return axios
    .post<string>(LessonRequestEnum.API_URL + LessonRequestEnum.DELETE_LESSON_URL + id)
    .then((response: AxiosResponse<string>) => response.data);
};
export { getLessonList, getLessonById, createLesson, updateLesson, deleteLesson };