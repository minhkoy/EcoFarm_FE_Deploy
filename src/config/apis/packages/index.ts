import axiosClient from '@/config/lib/axiosConfig'
import { type QuerySinglePackage, type QueryPackage, type ResponsePackages, type ResponsePackage } from '@/models/package.model'
import { type AxiosPromise } from 'axios'

const controller = '/FarmingPackage'

export const getListPackages = async (
  params: QueryPackage,
): AxiosPromise<ResponsePackages> =>
  axiosClient.get(`${controller}/GetList`, { params })

export const getPackageByIdOrCode = async (
  params: QuerySinglePackage,
): AxiosPromise<ResponsePackage> => 
  axiosClient.get(`${controller}/Get`, { params })