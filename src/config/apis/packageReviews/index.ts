import { axiosClient } from "@/config/lib/axiosConfig";
import { type ResponsePackageReviews, type QueryPackageReviews } from "@/models/packageReview.model";
import { type AxiosPromise } from "axios";

const controller = "/PackageReview";
export const getListPackageReviews = async (
    params: QueryPackageReviews
  ): AxiosPromise<ResponsePackageReviews> =>
    axiosClient.get(`${controller}/GetList`, { params })