import { axiosClient } from '@/config/lib/axiosConfig'
import { type ResponseEmail } from '@/models/user.model'
import { type AxiosPromise } from 'axios'

const controller = '/Account'

export const checkEmailApi = async (
  email: string,
): AxiosPromise<ResponseEmail> =>
  axiosClient.post(`${controller}/CheckEmail`, { email })
