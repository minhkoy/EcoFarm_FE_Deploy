import { getSinglePackage } from '@/config/apis/packages'
import { useQuery } from '@tanstack/react-query'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../redux/useAppSelector'
import { useAppDispatch } from '../redux/useAppDispatch'
import { setPackageId } from '@/config/reducers/package'

export const queryKey = ['package', 'getSinglePackage']

export default function useFetchSinglePackage() {
  // const appDispatch = useAppDispatch()
  // appDispatch(setPackageId(id))
  const params = useAppSelector((state) => state.singlePackage, shallowEqual)
  const {data, isLoading} =  useQuery({
    queryKey: [...queryKey, params],
    queryFn: () =>
      getSinglePackage(params),  
  })
  return ({
    packageData: data?.data.value,
    isLoading: isLoading,
  })
}