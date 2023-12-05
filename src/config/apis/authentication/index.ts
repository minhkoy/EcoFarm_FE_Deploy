import axiosClient from '@/config/lib/axiosConfig'
import { type LoginSchemaType, type SignUpSchemaType } from '@/config/schema'
import { type ReponseUser } from '@/models/user.model'

const controler = '/Authentication'

export const loginApi = async (params: LoginSchemaType) =>
  axiosClient.post<ReponseUser>(`${controler}/Login`, params)

export const signupApi = async (params: SignUpSchemaType) =>
  axiosClient.post<ReponseUser>(
    `${controler}/${
      params.accountType === 'Customer' ? 'SignupAsUser' : 'SignupAsEnterprise'
    }`,
    params,
  )
