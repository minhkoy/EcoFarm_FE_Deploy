export const ACCOUNT_TYPE = {
  SA: 'SuperAdmin',
  ADMIN: 'Admin',
  SELLER: 'Seller',
  CUSTOMER: 'Customer',
} as const

export const ACCESS_TOKEN = 'accessToken'

export const ERROR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

export const GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHERS: 'OTHERS',
} as const

export const CURRENCY_TYPE = {
  VND: 'VND',
  USD: 'USD',
} as const

export const SERVICE_PACKAGE_APPROVAL_STATUS = {
  Approved: 'Approved',
  Rejected: 'Rejected',
  Pending: 'Pending',
} as const

export const PACKAGE_TYPE = {
  Tourism: 'Tourism',
  Farming: 'Farming',
  PetCare: 'PetCare',
  Multiple: 'Multiple',
  Others: 'Others',
}
