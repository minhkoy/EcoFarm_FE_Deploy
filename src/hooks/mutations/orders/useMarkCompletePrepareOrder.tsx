import { markCompletePrepareOrder } from "@/config/apis/orders";
import { ToastHelper } from "@/utils/helpers/ToastHelper";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function useMarkCompletePrepareOrder() {
  const router = useRouter()
  return useMutation({
    mutationKey: ['markCompletePrepareOrder'],
    mutationFn: markCompletePrepareOrder,
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