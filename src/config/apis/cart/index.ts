import { axiosClient } from "@/config/lib/axiosConfig";
import { type ResponseCart } from "@/models/cart.model";
import { type ResponseModel } from "@/models/helpers/response.model";
import { type AxiosPromise } from "axios";

const controller = "/ShoppingCart";
export const GetMyShoppingCart = async (
): AxiosPromise<ResponseCart> => axiosClient.get(`${controller}/GetMyCart`)

export const AddToCart = async (
  productId?: string
): AxiosPromise<ResponseModel<boolean>> => axiosClient.post(`${controller}/AddNewProduct/${productId}`)

export const RemoveFromCart = async (
  productIds?: Array<string>
): AxiosPromise<ResponseModel<boolean>> => axiosClient.delete(`${controller}/RemoveProduct`, { data: productIds })