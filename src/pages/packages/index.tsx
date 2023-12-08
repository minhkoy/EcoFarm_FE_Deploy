import { setFilterParams } from '@/config/reducers/packages'
import useFetchPackage from '@/hooks/queries/useFetchPackage'
import { useAppDispatch } from '@/hooks/redux/useAppDispatch'
import { useAppSelector } from '@/hooks/redux/useAppSelector'
import MainLayout from '@/layouts/common/main'
import { type PackageModel } from '@/models/package.model'
import { Button, Card, CardBody, CardFooter, Image, Input, Select, SelectItem, Switch, cn } from '@nextui-org/react'
import { capitalize, isEmpty, toNumber, toString } from 'lodash-es'
import { type GetServerSideProps } from 'next'
import config from 'next-i18next.config.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useCallback, type ChangeEvent } from 'react'
import { type NextPageWithLayout } from '../_app'
import { useTranslation } from 'next-i18next'
import { splitDigits } from '@/utils/helpers/NumberHelper'
import ecoFarmLogo from '@/../public/assets/brands/EcoFarm.svg'
import { useRouter } from 'next/navigation'
import { StarRating } from '@/components/ui/ratings'
import { Star } from 'lucide-react'
//import Image from 'next/image'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'vi', ['common', 'farm-package'], config)),
    },
  }
}

const PackagesScreen: NextPageWithLayout = () => {
  const fakeFilter = [
    {
      label: '1',
      value: 1,
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
  const { t } = useTranslation()
  const router = useRouter() 
  const { data: packageData, isLoading } = useFetchPackage()
  const currentLimit = useAppSelector((s) => s.package.limit)
  const currentQuery = useAppSelector((s) => s.package)

  // const params = useAppSelector((state) => state.package, shallowEqual)
  // const { data: packageData, isLoading } = useQuery({
  //   queryKey: [...queryKey, params.page, params.limit, params.keyword],
  //   queryFn: () =>
  //     getListPackages({
  //       page: params.page ?? 1,
  //       limit: params.limit ?? 10,
  //       keyword: params.keyword ?? '',
  //     }),
  // })

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
    <div className=" grid grid-cols-3 gap-4">
      <div className="col-span-3 sm:col-span-1 bg-primary p-4 flex flex-col">
        <div className="mb-4">
          <p>Khoảng giá</p>
          <div className=" flex flex-row justify-center gap-3">
            <Input type="number"
              placeholder="Từ giá ..." 
              onChange={(e) => {
                appDispatch(
                  setFilterParams({
                    priceFrom: toNumber(e.target.value),
                  })
                , [appDispatch])
              }}/>
            <Input type="number"
              placeholder="Đến giá ..." />
          </div>
        </div>
        <div className="mb-4">
          <Switch>Đã bắt đầu</Switch>
        </div>
        <div className="mb-4">
          <Switch>Đã kết thúc</Switch>
        </div>
        <div className='mb-4 object-center'>
          <Button color='primary'
            onClick={() => {
              console.log()
            }}
          >Tìm kiếm</Button>
        </div>
      </div>

      <div className="col-span-3 sm:col-span-2 bg-primary p-4">
        <p>Column 2 Content</p>
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
        <div className="">
          {
            (isEmpty(packageData) || !packageData) ?
              <p>
                {t('notFound.package', { ns: 'farm-package' })}
              </p>
              :
              <>
                <p>{capitalize(t('info.farm-package', { ns: 'farm-package', total: packageData.length }))}</p>
                {packageData?.map((_package, index) =>
                  <Card className='w-56 m-2' shadow='md' key={index} isPressable
                  onPress={() => {
                    router.push(`./packages/${_package.id}`)
                  }}>
                    <CardBody className='overflow-visible p-0'>
                      <Image src={'/assets/brands/EcoFarm.svg'} alt='Logo' 
                        shadow='sm' radius='lg' width='100%'
                        className='w-full object-cover h-[140px] text-center'
                      />
                        {/* {cn(
                          t('farming-package', { ns: 'common' }), ':',
                          t('has-price', { ns: 'farm-package', name: _package.name, price: _package.price })
                        )} */}
                    </CardBody>
                    <CardFooter className='text-small justify-between m-2'>
                      <div className='m-2'>
                        <b>{_package.name}</b>
                        <p className="text-default-500">{splitDigits(_package.price!)} VND</p>                     
                      </div>
                      <div className='m-2'>
                        <span className='font-bold'>
                          {_package.averageRating} 
                          <Star color='yellow' />  
                        </span> 
                      </div>                      
                    </CardFooter>
                  </Card>
                )}
              </>
          }
        </div>
      </div>
    </div>
  )
}

PackagesScreen.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}

export default PackagesScreen
