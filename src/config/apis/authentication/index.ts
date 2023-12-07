import axiosClient from '@/config/lib/axiosConfig'
import { type LoginSchemaType, type SignUpSchemaType } from '@/config/schema'
import { type ResponseUser } from '@/models/user.model'
import { type AxiosPromise } from 'axios'

const controler = '/Authentication'

export const loginApi = async (
  params: LoginSchemaType,
): AxiosPromise<ResponseUser> => axiosClient.post(`${controler}/Login`, params)

export const signupApi = async (
  params: SignUpSchemaType,
): AxiosPromise<ResponseUser> =>
  axiosClient.post(
    `${controler}/${
      params.accountType === 'Customer' ? 'SignupAsUser' : 'SignupAsEnterprise'
    }`,
    params,
  )
