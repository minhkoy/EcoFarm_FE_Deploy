import { shallowEqual } from "react-redux"
import { useAppSelector } from "../redux/useAppSelector"
import { useQuery } from "@tanstack/react-query"
import { getListProducts } from "@/config/apis/products"

export const queryKey = ['products', 'getListProducts']

export default function useFetchProducts() {
  const params = useAppSelector((state) => state.product, shallowEqual)
  // const [debounced] = useDebounce(params.keyword, timeout ?? 500)
  // const keywords = useAppSelector((state) => state.package.keyword)

  const {data, isLoading} = useQuery({
    staleTime: 0,
    queryKey: [...queryKey, params],
    queryFn: () =>
      getListProducts({
        ...params,
      }),
  })

  return {
    productData: data?.data.value,
    isLoading: isLoading,
  }
}
