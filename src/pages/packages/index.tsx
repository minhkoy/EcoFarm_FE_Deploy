import { setFilterParams } from '@/config/reducers/packages'
import useFetchPackage from '@/hooks/queries/useFetchPackage'
import { useAppDispatch } from '@/hooks/redux/useAppDispatch'
import { useAppSelector } from '@/hooks/redux/useAppSelector'
import MainLayout from '@/layouts/common/main'
import { type QueryPackages, type PackageModel } from '@/models/package.model'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
  Select,
  SelectItem,
  Switch,
  cn,
} from '@nextui-org/react'
import { capitalize, isEmpty, toNumber, toString } from 'lodash-es'
import { type GetServerSideProps } from 'next'
import config from 'next-i18next.config.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useCallback, type ChangeEvent, useState } from 'react'
import { type NextPageWithLayout } from '../_app'
import { useTranslation } from 'next-i18next'
import ecoFarmLogo from '@/../public/assets/brands/EcoFarm.svg' // => đọc lại cách import image của nextjs, như này sai rồi
import { useRouter } from 'next/navigation'
import { Star, StarIcon } from 'lucide-react'
import { splitDigits } from '@/utils/helpers/CommonHelper'
import { SELECT_LIMIT } from '@/utils/constants/selectOption'
//import Image from 'next/image'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale ?? 'vi',
        ['common', 'farm-package'],
        config,
      )),
    },
  }
}

const PackagesScreen: NextPageWithLayout = () => {
  const [filters, setFilterParams] = useState<QueryPackages>({
    limit: 10,
    page: 1,
    keyword: '',
    priceFrom: undefined,
    priceTo: undefined,
    enterpriseId: '',    
    isEnded: false,
  })
  const appDispatch = useAppDispatch()
  const { t } = useTranslation()
  const router = useRouter()
  const { data: packageData, isLoading } = useFetchPackage()
  
  // const onChange = useCallback(
  //   (e: ChangeEvent<HTMLSelectElement>) => {
  //   setFilterParams(prev => ({
  //     ...prev,
  //     limit: toNumber(e.target.value)
  //   }))
  //   },
  //   [],
  // )

  return (
    <div className=' grid grid-cols-3 gap-4'>
      <div className='col-span-3 flex flex-col bg-primary p-4 sm:col-span-1'>
        <div className='mb-4'>
          <Input 
            type='text'
            placeholder='Tên gói farming ...'
            onChange={(e) => {
              setFilterParams({
                ...filters,
                keyword: e.target.value,
              })            
            }}
          />
        </div>
        <div className='mb-4'>
          <p>Khoảng giá</p>
          <div className=' flex flex-row justify-center gap-3'>
            <Input
              type='number'
              //pattern='[0-9]*'
              placeholder='Từ giá ...'
              onChange={(e) => {
                setFilterParams({
                  ...filters,
                  priceFrom: toNumber(e.target.value),
                })                
              }}
            />
            <Input type='number' placeholder='Đến giá ...' 
              onChange={(e) => {
                setFilterParams({
                  ...filters,
                  priceTo: toNumber(e.target.value),
                })                
              }}
            />
          </div>
        </div>
        <div className='mb-4'>
          <Switch
            onChange={(e) => {
              setFilterParams({
                ...filters,
                isStart: e.target.checked,
              })
            }}
          >Đã bắt đầu
          </Switch>
        </div>
        <div className='mb-4'>
          <Switch
            onChange={(e) => {
              setFilterParams({
                ...filters,
                isEnded: e.target.checked,
              })
            }}
          >Đã kết thúc
          </Switch>
        </div>
        <div className='mb-4 object-center'>
          <Button
            color='primary'
            onClick={() => {
              appDispatch(setFilterParams(filters));
            }}
          >
            Tìm kiếm
          </Button>
        </div>
      </div>

      <div className='col-span-3 bg-primary p-4 sm:col-span-2'>
        <p>Column 2 Content</p>
        {/* <Select
          items={SELECT_LIMIT}
          label='Limit'
          placeholder='Select limit'
          className='max-w-xs'
          isLoading={isLoading}
          onChange={onChange}
          //defaultSelectedKeys={[toString(currentLimit)]}
        >
          {(items) => (
            <SelectItem key={items.value} color='primary'>
              {items.label}
            </SelectItem>
          )}
        </Select> */}
        <div className=''>
          {isEmpty(packageData) || !packageData ? (
            <p>{t('notFound.package', { ns: 'farm-package' })}</p>
          ) : (
            <>
              <p>
                {capitalize(
                  t('info.farm-package', {
                    ns: 'farm-package',
                    total: packageData.length,
                  }),
                )}
              </p>
              {packageData?.map((_package, index) => (
                <Card
                  className='m-2 w-56'
                  shadow='md'
                  key={index}
                  isPressable
                  onPress={() => {
                    router.push(`./packages/${_package.id}`)
                  }}
                >
                  <CardBody className='overflow-visible p-0'>
                    <Image
                      src={'/assets/brands/EcoFarm.svg'}
                      alt='Logo'
                      shadow='sm'
                      radius='lg'
                      width='100%'
                      className='h-[140px] w-full object-cover text-center'
                    />
                    {/* {cn(
                          t('farming-package', { ns: 'common' }), ':',
                          t('has-price', { ns: 'farm-package', name: _package.name, price: _package.price })
                        )} */}
                  </CardBody>
                  <CardFooter className='m-2 justify-between text-small'>
                    <div className='m-2'>
                      <b>{_package.name}</b>
                      <p className='text-default-500'>
                        {splitDigits(_package.price!)} VND
                      </p>
                    </div>
                    <div className='m-2'>
                      <span className='font-bold'>
                        {_package.averageRating}
                        <StarIcon className='h-4 w-4 text-yellow-500' />
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

PackagesScreen.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}

export default PackagesScreen
