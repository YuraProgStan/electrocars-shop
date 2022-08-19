import {axiosService, } from './axios.service';
import  {urls} from '../constants/urls';

export const userService = {
    getAll: () => axiosService.get(`${urls.user}`),
    getStats: () => axiosService.get(`${urls.user}/stats`),
    deleteById: (id) => axiosService.delete(`${urls.user}/${id}`),
    updateById: (id, formdata) => {
        for (const value of formdata.values()) {
            console.log(value);
        }
       return  axiosService.patch(`${urls.user}/${id}`,formdata)
    },
    create: (formdata) => {
        for (const value of formdata.values()) {
            console.log(value);
        }
        return  axiosService.post(`${urls.user}`,formdata)
    }

}
