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
  seller: EnterpriseModel
  description: string
  estimateStartTime: Date
  estimateEndTime: Date
  closeRegisterTime: Date
  startTime: Date
  endTime: Date
  price?: number
  currency: keyof typeof CURRENCY_TYPE
  currenyName: keyof typeof CURRENCY_TYPE
  quantityTotal: number
  quantityRegister: number
  quantityRemain: number
  rejectReason?: string
  servicePackageApprovalStatus: keyof typeof SERVICE_PACKAGE_APPROVAL_STATUS
  servicePackageType: keyof typeof PACKAGE_TYPE
  serviceTypeName: string
  registeredUsers?: Array<UserModel>
  numbersOfRating?: number
  averageRating?: number
}

export type ResponsePackages = ResponseModel<Array<PackageModel>>
export type ResponsePackage = ResponseModel<PackageModel>
export type QueryPackage = QueryRequest<{
  enterpriseId?: string
  priceFrom?: number
  priceTo?: number
  isStart?: boolean
  isEnded?: boolean
}>

export type QuerySinglePackage = QueryRequest<{
  id?: string
  code?: string
}>