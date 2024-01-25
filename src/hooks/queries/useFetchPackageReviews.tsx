import { getListPackageReviews } from "@/config/apis/packageReviews"
import { useQuery } from "@tanstack/react-query"
import { shallowEqual } from "react-redux"
import { useAppSelector } from "../redux/useAppSelector"

export const queryKey = ['packageReviews', 'getPackageReviews']

export default function useFetchPackageReviews(packageId?: string) {
  const params = useAppSelector((state) => state.packageReviews, shallowEqual)

  const { data, isLoading } = useQuery({
    //enabled: false,
    staleTime: 0,
    queryKey: [...queryKey, params, packageId],
    queryFn: () =>
      getListPackageReviews({
        ...params,
        packageId: packageId!
      }),
  })

  return {
    packageReviewsData: data?.data.value,
    isLoading: isLoading,
  }
}