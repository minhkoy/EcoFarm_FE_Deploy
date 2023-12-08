import { getListPackages } from '@/config/apis/packages'
import { useQuery } from '@tanstack/react-query'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../redux/useAppSelector'

export const queryKey = ['packages', 'getListPackages']

export default function useFetchPackage() {
  const params = useAppSelector((state) => state.package, shallowEqual)
  return useQuery({
    staleTime: 0, // 0 = always fetch, Infinity = never refetch
    queryKey: [...queryKey, params],
    queryFn: () =>
      getListPackages({
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        keyword: params.keyword ?? '',
      }),
      select: (data) => {
        if(data.status >= 200 && data.status < 300) {
          return data.data.value
        }
        return []
      },
  })
}
