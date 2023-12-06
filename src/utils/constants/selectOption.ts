import { ACCOUNT_TYPE, ORDER_STATUS, PAYMENT_METHOD } from './enums'

export const SELECT_ACCOUNT_TYPE = [
  { value: ACCOUNT_TYPE.SELLER, label: 'seller' },
  { value: ACCOUNT_TYPE.CUSTOMER, label: 'customer' },
]

export const SELECT_PAYMENT_METHOD = [
  { value: PAYMENT_METHOD.ServicePackage, label: 'service-package' },
  { value: PAYMENT_METHOD.Service, label: 'service' },
  { value: PAYMENT_METHOD.SellingProduct, label: 'selling-product' },
]

export const SELECT_ORDER_STATUS = [
  { value: ORDER_STATUS.CancelledByCustomer, label: 'cancelled-by-customer' },
  { value: ORDER_STATUS.Preparing, label: 'preparing' },
  { value: ORDER_STATUS.Received, label: 'received' },
  { value: ORDER_STATUS.RejectedBySeller, label: 'rejected-by-seller' },
  { value: ORDER_STATUS.SellerConfirmed, label: 'seller-confirmed' },
  { value: ORDER_STATUS.Shipped, label: 'shipped' },
  { value: ORDER_STATUS.Shipping, label: 'shipping' },
  { value: ORDER_STATUS.WaitingSellerConfirm, label: 'waiting-seller-confirm' },
]
