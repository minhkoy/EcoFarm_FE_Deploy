import { getListPackages } from '@/config/apis/packages'
import { setFilterParams } from '@/config/reducers/packages'
import { queryKey } from '@/hooks/queries/useFetchPackage'
import { useAppDispatch } from '@/hooks/redux/useAppDispatch'
import { useAppSelector } from '@/hooks/redux/useAppSelector'
import MainLayout from '@/layouts/common/main'
import { Select, SelectItem } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { toNumber } from 'lodash-es'
import { useCallback, type ChangeEvent } from 'react'
import { shallowEqual } from 'react-redux'
import { type NextPageWithLayout } from '../_app'

const PackagesScreen: NextPageWithLayout = () => {
  const fakeFilter = [
    {
      label: '10',
      value: 10,
    },
    {
      label: '20',
      value: 20,
    },
    {
      label: '30',
      value: 30,
    },
    {
      label: '40',
      value: 40,
    },
    {
      label: '50',
      value: 50,
    },
  ]

  const appDispatch = useAppDispatch()
  const params = useAppSelector((state) => state.package, shallowEqual)
  const { data: packageData, isLoading } = useQuery({
    queryKey: [...queryKey, params.page, params.limit, params.keyword],
    queryFn: () =>
      getListPackages({
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        keyword: params.keyword ?? '',
      }),
  })

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      appDispatch(
        setFilterParams({
          limit: toNumber(e.target.value),
        }),
      )
    },
    [appDispatch],
  )

  return (
    <div className=''>
      <section>{packageData?.data.value.id}</section>
      <Select
        items={fakeFilter}
        label='Test'
        placeholder='Select limit'
        className='max-w-xs'
        isLoading={isLoading}
        onChange={onChange}
      >
        {(fakeFilter) => (
          <SelectItem key={fakeFilter.value}>{fakeFilter.label}</SelectItem>
        )}
      </Select>
    </div>
  )
}

PackagesScreen.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}

export default PackagesScreen
