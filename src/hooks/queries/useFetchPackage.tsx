import { getListPackages } from '@/config/apis/packages'
import { useQuery } from '@tanstack/react-query'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../redux/useAppSelector'
import { useDebounce } from 'use-debounce'

export const queryKey = ['packages', 'getListPackages']

export default function useFetchPackage(timeout?: number) {
  const params = useAppSelector((state) => state.package, shallowEqual)
  const [debounced] = useDebounce(params.keyword, timeout ?? 500)
  // const keywords = useAppSelector((state) => state.package.keyword)

  const {data, isLoading} = useQuery({
    staleTime: 0,
    queryKey: [...queryKey, debounced, params],
    queryFn: () =>
      getListPackages({
        ...params,
      }),
  })

  return {
    packageData: data?.data.value,
    isLoading: isLoading,
  }
}
