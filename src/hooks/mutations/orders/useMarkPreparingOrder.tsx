import { markPreparingOrder } from "@/config/apis/orders";
import { ToastHelper } from "@/utils/helpers/ToastHelper";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function useMarkPreparingOrder() {
  const router = useRouter()
  return useMutation({
    mutationKey: ['markPreparingOrder'],
    mutationFn: markPreparingOrder,
    onSuccess: ({ data }) => {
      if (data.isSuccess) {
        ToastHelper.success(
          'Thành công',
          data.successMessage //XXX
        )
        router.reload()
      }
      else {
        ToastHelper.error(
          'Lỗi',
          data.errors.join('. ') //data.errors.join('. '),
        )
      }
    }
  })
}