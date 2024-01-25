import { axiosClient } from "@/config/lib/axiosConfig"
import { type QueryEnterpriseStats, type ResponseEnterpriseStatsModel } from "@/models/stats.model"
import { type AxiosPromise } from "axios"

const controller = '/Stats'
export const getMyEnterpriseStat = async (
  params: QueryEnterpriseStats
): AxiosPromise<ResponseEnterpriseStatsModel> =>
  axiosClient.get(`${controller}/GetEnterpriseStats`, { params })