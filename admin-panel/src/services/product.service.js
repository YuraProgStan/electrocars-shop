import {axiosService} from "./axios.service";
import {urls} from "../constants/urls";

export const productService = {
    getAll: () => axiosService.get(urls.products),

    deleteById: (id) => axiosService.delete(`urls.products/${id}`),

    updateById: (id,product) => axiosService.patch(`urls.products/${id}`, product),

    add: (product) => axiosService.post(urls.products, product),
    deleteTempImage: (image) =>{
        console.log('deleteTempImage');
        console.log(image)
        return axiosService.post(urls.removeImage, image)
    }
}