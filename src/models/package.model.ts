import {
  type CURRENCY_TYPE,
  type PACKAGE_TYPE,
  type SERVICE_PACKAGE_APPROVAL_STATUS,
} from '@/utils/constants/enums'
import { type EnterpriseModel } from './enterprise.model'
import { type QueryRequest } from './helpers/query.model'
import { type ResponseModel } from './helpers/response.model'
import { type UserModel } from './user.model'

export type PackageModel = {
  id: string
  code: string
  name: string
  createAt: Date
  createBy: string
  seller: Pick<EnterpriseModel, 'accountId' | 'taxCode' | 'fullName'>
  description: string
  times: Time
  price?: number
  currency: keyof typeof CURRENCY_TYPE
  currenyName: keyof typeof CURRENCY_TYPE
  quantity?: Quantity
  rejectReason?: string
  servicePackageApprovalStatus: keyof typeof SERVICE_PACKAGE_APPROVAL_STATUS
  servicePackageType: keyof typeof PACKAGE_TYPE
  serviceTypeName: string
  registeredUsers?: Array<
    Pick<UserModel, 'accountId' | 'username' | 'fullName'> & {
      registerTime?: Date
    }
  >
  rating?: Rating
}

type Time = {
  estimateStartTime: Date
  estimateEndTime: Date
  closeRegisterTime: Date
  startTime: Date
  endTime: Date
}

type Quantity = {
  quantityTotal: number
  quantityRegister: number
  quantityRemain: number
}

type Rating = {
  total: number
  average: number
}

export type ResponsePackage = ResponseModel<PackageModel>
export type QueryPackage = QueryRequest<{
  enterpriseId?: string
  priceFrom?: number
  priceTo?: number
  isStart?: boolean
  isEnded?: boolean
}>
