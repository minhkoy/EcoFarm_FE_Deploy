import axiosClient from '@/config/lib/axiosConfig'
import { type QueryPackage, type ResponsePackage } from '@/models/package.model'

const controller = '/FarmingPackage'

export const getListPackages = async (params: QueryPackage) =>
  axiosClient.get<ResponsePackage>(`${controller}/GetList`, { params })
