import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

export const orderService = {
    getAll: () => axiosService.get(urls.orders),
    getIncome: (productId) =>{
        if(!productId){
          return   axiosService.get(`${urls.orders}/income`)
        }
        else {

         return    axiosService.get(`${urls.orders}/income?pid=${productId}`)
        }

    }
}