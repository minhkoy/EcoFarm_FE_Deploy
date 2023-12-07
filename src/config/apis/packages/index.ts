import axiosClient from '@/config/lib/axiosConfig'
import { type QueryPackage, type ResponsePackage } from '@/models/package.model'
import { type AxiosPromise } from 'axios'

const controller = '/FarmingPackage'

export const getListPackages = async (
  params: QueryPackage,
): AxiosPromise<ResponsePackage> =>
  axiosClient.get(`${controller}/GetList`, { params })
