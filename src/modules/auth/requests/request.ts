import axios, { AxiosResponse } from "axios";
import { AuthRequestEnum } from "../enum/authRequestEnum";
import { tokenResponse } from "../interfaces/model";


const userLogin = (username: string, password: string): Promise<tokenResponse> => {
  return axios
    .post(AuthRequestEnum.API_URL + AuthRequestEnum.LOGIN_URL + `?username=${username}&password=${password}`)
    .then((response: AxiosResponse<tokenResponse>) => response.data);
};

export { userLogin };