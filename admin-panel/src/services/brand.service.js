import {urls} from "../constants/urls";
import {axiosService} from "./axios.service";

export const brandService = {
    getAll: () => {
        return axiosService.get(urls.brand)
    },
    deleteById: (id) => axiosService.delete(`${urls.brand}/${id}`),
    updateById: (id, data) => {
      console.log(data)
        return  axiosService.put(`${urls.brand}/${id}`,data)
    },
    create: (data) => {
        return  axiosService.post(`${urls.brand}`,data)
    }
}