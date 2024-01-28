import { AddToCart } from "@/config/apis/cart";
import useGetMyShoppingCart from "@/hooks/queries/useGetMyShoppingCart";
import { EFX } from "@/utils/constants/constants";
import { ToastHelper } from "@/utils/helpers/ToastHelper";
import { useMutation } from "@tanstack/react-query";

export default function useAddProductToCart() {
  const { refetch } = useGetMyShoppingCart()
  return useMutation({
    mutationKey: ['addProductToCart'],
    mutationFn: AddToCart,
    onSuccess: ({ data }) => {
      if (data.isSuccess) {
        ToastHelper.success(
          'Thành công',
          data.successMessage ?? 'Thêm vào giỏ hàng thành công' //XXX
        )
        void refetch()
        //router.reload()
      }
      else {
        ToastHelper.error(
          'Lỗi',
          data.errors.join('. ') ?? EFX.DEFAULT_ERROR_MESSAGE//data.errors.join('. '),
        )
      }
    }
  })
}