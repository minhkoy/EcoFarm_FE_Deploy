import { getListPackages } from '@/config/apis/packages'
import { useQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash-es'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../redux/useAppSelector'

export const queryKey = ['packages', 'getListPackages']

export default function useFetchPackage() {
  const params = useAppSelector((state) => state.package, shallowEqual)
  return useQuery({
    enabled: !isEmpty(params),
    queryKey: [...queryKey, params],
    queryFn: () => getListPackages(params),
  })
}
