import { useRouter } from 'next/router'
import MainLayout from '@/layouts/common/main'
import { type NextPageWithLayout } from '@/pages/_app'
import { getQueryUrlValue } from '@/utils/helpers/CommonHelper'
import { useMemo } from 'react'
import useFetchSinglePackage from '@/hooks/queries/useFetchSinglePackage'

const PackageDetailScreen: NextPageWithLayout = () => {
  const { query } = useRouter()
  const packageId = useMemo(() => getQueryUrlValue(query, 0), [query])
  const { data: packageData, isLoading } = useFetchSinglePackage()
  return (
    // {
    //     isLoading ? {
    //         <>
    //         </>
    //     } : {
    //         <>
    //         </>
    //     }
    // }
    <div>
      <h1>Package Detail of ID: {packageId}</h1>
    </div>
  )
}

PackageDetailScreen.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>
}
export default PackageDetailScreen
