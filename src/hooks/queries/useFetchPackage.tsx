import { getListPackages } from '@/config/apis/packages'
import { useQuery } from '@tanstack/react-query'
import { useAppSelector } from '../redux/useAppSelector'

export const queryKey = ['packages', 'getListPackages']

export default function useFetchPackage() {
  const params = useAppSelector((state) => state.filterParams)
  return useQuery({
    queryKey: [...queryKey, params],
    queryFn: () => getListPackages(params),
  })
}
