import axios, { AxiosResponse } from "axios";
import {TokenEnum} from "../enum/tokenEnum";
import {validateTokenResponse} from "../interfaces/model";


const validateToken = (token: string): Promise<validateTokenResponse> => {
  return axios
    .post(TokenEnum.API_URL + TokenEnum.VALIDATE_TOKEN_URL, token)
    .then((response: AxiosResponse<validateTokenResponse>) => response.data);
};

export { validateToken };