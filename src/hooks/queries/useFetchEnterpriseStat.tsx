import { getMyEnterpriseStat } from "@/config/apis/stats"
import { useQuery } from "@tanstack/react-query"
import { shallowEqual } from "react-redux"
import { useDebounce } from "use-debounce"
import { useAppSelector } from "../redux/useAppSelector"

const queryKey = ['stats', 'getEnterpriseStats']
export default function useFetchEnterpriseStat(timeout?: number) {
  const [params] = useDebounce(useAppSelector((state) => state.enterpriseStats, shallowEqual), timeout ?? 500)

  const { data, isLoading, refetch } = useQuery({
    staleTime: 1000,
    queryKey: [...queryKey, params],
    queryFn: () =>
      getMyEnterpriseStat({
        ...params,
      }),
  })

  return {
    stats: data?.data.value,
    isLoading: isLoading,
    refetchOrder: refetch,
  }
}
