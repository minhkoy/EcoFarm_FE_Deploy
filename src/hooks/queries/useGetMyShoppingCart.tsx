import { GetMyShoppingCart } from "@/config/apis/cart"
import { useQuery } from "@tanstack/react-query"

export const queryKeys = ['cart', 'getMyCart']

export default function useGetMyShoppingCart() {
  const result = useQuery({
    //enabled,
    staleTime: 1000 * 6,
    queryKey: [...queryKeys],
    queryFn: GetMyShoppingCart,
  })

  return {
    cartData: result.data?.data.value,
    isLoading: result.isLoading,
  }
}