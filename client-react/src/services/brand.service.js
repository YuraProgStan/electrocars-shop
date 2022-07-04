import {urls} from "../constants/urls";
import {axiosService} from "./axios.service";

export const brandService = {
    getAll: () => axiosService.get(urls.brand),
}