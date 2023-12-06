import { type AccountModel } from './account.model'

export type EnterpriseModel = AccountModel & {
  address: string
  taxCode: string
  description: string
  avatarUrl: string
  hotline: string
}
