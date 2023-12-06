import { type AccountModel } from './account.model'

export type EnterpriseModel = AccountModel & {
  enterpriseId: string
  address: string
  taxCode: string
  description: string
  avatarUrl: string
  hotline: string
}
