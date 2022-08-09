import {urls} from "../constants/urls";
import {axiosService} from "./axios.service";

export const orderService = {
   postOrder:(order) => axiosService.post(`${urls.order}`, order)
}