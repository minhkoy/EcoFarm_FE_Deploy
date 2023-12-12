import { axiosClient } from "@/config/lib/axiosConfig";
import { type ResponseProducts, type QueryProducts } from "@/models/product.model";
import { type AxiosPromise } from "axios";

const controller = '/Product'
export const getListProducts = async (
    params: QueryProducts
  ): AxiosPromise<ResponseProducts> =>
    axiosClient.get(`${controller}/GetList`, { params })