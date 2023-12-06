import {
  type CURRENCY_TYPE,
  type ORDER_STATUS,
  type PAYMENT_METHOD,
} from '@/utils/constants/enums'
import { type EnterpriseModel } from './enterprise.model'
import { type UserModel } from './user.model'

export type OrderModel = {
  id: string
  code: string
  name: string
  userId: Pick<UserModel, 'id'>
  note: string
  seller: EnterpriseModel
  addressId: string
  addressDescription: string
  createdAt: Date
  updatedAt?: Date
  totalPrice?: number
  totalQuantity?: number
  currency?: keyof typeof CURRENCY_TYPE
  currencyName?: string
  paymentMethod?: keyof typeof PAYMENT_METHOD
  paymentMethodName?: string
  orderStatus?: keyof typeof ORDER_STATUS
  orderStatusName?: string
}
