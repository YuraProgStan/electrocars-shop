import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

export const authService = {
    login: (user) => {

        console.log('authservice', user)
        return axiosService.post(`${urls.auth}/login`, user)},
    getById: (id) => axiosService.get(`${urls.products}/find/${id}`),
    me: () => axiosService.get(`${urls.auth}/me`),
    refresh: (refresh) => axiosService.post(`${urls.auth}/refresh`, {refresh}),
    register: (user) => axiosService.post(`${urls.auth}/register`, user),
    googleAuth: (token) => axiosService.post(`${urls.auth}/google`,{token}),
    facebookAuth: ({userID, accessToken}) => axiosService.post(`${urls.auth}/facebook`,{userID, accessToken})
}