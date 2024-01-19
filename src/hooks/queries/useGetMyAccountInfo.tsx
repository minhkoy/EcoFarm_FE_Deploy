import { getMyAccountInfoApi } from "@/config/apis/account"
import { useQuery } from "@tanstack/react-query"

export const queryKeys = ['account', 'getMyAccountInfo']

export default function useGetMyAccountInfo(enabled = false) {
  return useQuery({
    refetchOnWindowFocus: false,
    staleTime: 1000,
    enabled,
    queryKey: [...queryKeys],
    queryFn: getMyAccountInfoApi,
  })
}