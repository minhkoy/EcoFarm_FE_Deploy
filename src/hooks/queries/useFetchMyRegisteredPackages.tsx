import { getMyRegisteredPackages } from '@/config/apis/packages'
import { useQuery } from '@tanstack/react-query'
import { shallowEqual } from 'react-redux'
import { useDebounce } from 'use-debounce'
import { useAppSelector } from '../redux/useAppSelector'

export const queryKey = ['packages', 'getListMyRegisteredPackages']

export default function useFetchMyRegisteredPackages(timeout?: number) {
  const [params] = useDebounce(useAppSelector((state) => state.myPackage, shallowEqual), timeout ?? 500)

  const { data, isLoading } = useQuery({
    //staleTime: 1000,
    queryKey: [...queryKey, params],
    queryFn: () =>
      getMyRegisteredPackages({
        ...params,
      }),
  })

  return {
    packageData: data?.data.value,
    isLoading: isLoading,
  }
}
