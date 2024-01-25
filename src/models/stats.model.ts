import { type ResponseModel } from "./helpers/response.model";
import { type PackageModel } from "./package.model";
import { type ProductModel } from "./product.model";

export type EnterpriseStatsModel = {
  enterpriseId?: string;
  enterpriseName?: string;
  totalRegisterPackageInTimeRange?: number;
  totalSoldProductInTimeRange?: number;
  totalOrderPriceInTimeRange?: number;
  totalOrderPriceSoFar?: number;
  topSoldProductsInTimeRange?: Array<ProductModel>;
  topRegisteredPackagesInTimeRange?: Array<PackageModel>;
}

export type ResponseEnterpriseStatsModel = ResponseModel<EnterpriseStatsModel>
export type QueryEnterpriseStats = {
  fromDate?: Date // | null;
  toDate?: Date //| null;
}