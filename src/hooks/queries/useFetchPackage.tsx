import { getListPackages } from '@/config/apis/packages'
import { useQuery } from '@tanstack/react-query'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../redux/useAppSelector'

export const queryKey = ['packages', 'getListPackages']

export default function useFetchPackage() {
  const params = useAppSelector((state) => state.package, shallowEqual)
  return useQuery({
    queryKey: [...queryKey, params],
    queryFn: () =>
      getListPackages({
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        keyword: params.keyword ?? '',
      }),
  })
}
