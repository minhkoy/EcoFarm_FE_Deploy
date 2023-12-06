import { type PackageModel } from './package.model'

export type ActivityModel = {
  id: string
  code: string
  title: string
  description: string
  package: PackageModel
  createdAt: Date
  createdBy: string
  medialUrl: string
}
