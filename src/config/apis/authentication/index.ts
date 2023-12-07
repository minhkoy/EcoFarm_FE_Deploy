import axiosClient from '@/config/lib/axiosConfig'
import { type LoginSchemaType, type SignUpSchemaType } from '@/config/schema'
import { type ResponseUser } from '@/models/user.model'

const controler = '/Authentication'

export const loginApi = async (
  params: LoginSchemaType,
): Promise<ResponseUser> => axiosClient.post(`${controler}/Login`, params)

export const signupApi = async (
  params: SignUpSchemaType,
): Promise<ResponseUser> =>
  axiosClient.post(
    `${controler}/${
      params.accountType === 'Customer' ? 'SignupAsUser' : 'SignupAsEnterprise'
    }`,
    params,
  )
