import {urls} from "../constants/urls";
import {axiosService} from "./axios.service";

export const modelService = {
    getAll: () => axiosService.get(urls.model),
    getById:(modelId) => axiosService.get(`${urls.model}/${modelId}`)
}