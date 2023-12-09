import { getSinglePackage } from '@/config/apis/packages'
import { useQuery } from '@tanstack/react-query'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../redux/useAppSelector'

export const queryKey = ['package', 'getSinglePackage']

export default function useFetchSinglePackage() {
  const params = useAppSelector((state) => state.singlePackage, shallowEqual)
  return useQuery({
    queryKey: [...queryKey, params],
    queryFn: () =>
      getSinglePackage(params),  
  })
}
