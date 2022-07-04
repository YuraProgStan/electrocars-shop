import axios from "axios";
import baseURL from "../constants/urls";
import {authService} from "./auth.service";
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();
const axiosService = axios.create({baseURL})
let isRefreshing = false;
axiosService.interceptors.request.use(config => {
    const token = localStorage.getItem('access');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

axios.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const refreshTokenLocal = localStorage.getItem("refresh");

        if (error.response?.status === 401 && error.config && !isRefreshing && refreshTokenLocal) {
            isRefreshing = true
            try {
                const {data} = await authService.refresh(refreshTokenLocal);
                const {accessToken, refreshToken} = data;
                localStorage.setItem('refresh', refreshToken)
                localStorage.setItem('access', accessToken)
            } catch (e) {
                localStorage.clear();
                history.replace('/login?expSession=true');
            }
            isRefreshing = false;

            return axiosService.request(error.config)
        }
        return Promise.reject(error)
    }
)

export {
    axiosService,
    history
}