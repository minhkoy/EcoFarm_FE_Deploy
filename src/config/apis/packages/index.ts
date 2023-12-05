import axiosClient from '@/config/lib/axiosConfig'

const prefix = '/Packages'

export const getListPackages = async (params) =>
  axiosClient.get(`${prefix}/GetList`, {
    params,
  })
