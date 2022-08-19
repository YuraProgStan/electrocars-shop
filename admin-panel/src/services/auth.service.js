import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

export const authService = {
    login: (user) => axiosService.post(`${urls.auth}/login`, user),
    refresh: (refresh) => axiosService.post(`${urls.auth}/refresh`, {refresh})
}