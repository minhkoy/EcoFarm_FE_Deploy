import { setFilterParams } from '@/config/reducers/packages'
import useFetchPackage from '@/hooks/queries/useFetchPackage'
import { useAppDispatch } from '@/hooks/redux/useAppDispatch'
import { useAppSelector } from '@/hooks/redux/useAppSelector'
import MainLayout from '@/layouts/common/main'
import { Select, SelectItem } from '@nextui-org/react'
import { toNumber, toString } from 'lodash-es'
import { type GetServerSideProps } from 'next'
import config from 'next-i18next.config.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useCallback, type ChangeEvent } from 'react'
import { type NextPageWithLayout } from '../_app'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'vi', ['common'], config)),
    },
  }
}

const PackagesScreen: NextPageWithLayout = () => {
  const fakeFilter = [
    {
      label: '5',
      value: 5,
    },
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
  ]

  const appDispatch = useAppDispatch()
  const { data: packageData, isLoading } = useFetchPackage()
  const currentLimit = useAppSelector((s) => s.package.limit)
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
        label='Limit'
        placeholder='Select limit'
        className='max-w-xs'
        isLoading={isLoading}
        onChange={onChange}
        defaultSelectedKeys={[toString(currentLimit)]}
      >
        {(fakeFilter) => (
          <SelectItem key={fakeFilter.value} color='primary'>
            {fakeFilter.label}
          </SelectItem>
        )}
      </Select>
    </div>
  )
}

PackagesScreen.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}

export default PackagesScreen
