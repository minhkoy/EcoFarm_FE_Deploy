import { getListPackages } from '@/config/apis/packages'
import { useQuery } from '@tanstack/react-query'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../redux/useAppSelector'

export const queryKey = ['packages', 'getListPackages']

export default function useFetchPackage() {
  const params = useAppSelector((state) => state.package, shallowEqual)
  // const keywords = useAppSelector((state) => state.package.keyword)

  const {data, isLoading} = useQuery({
    queryKey: [...queryKey, params],
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
