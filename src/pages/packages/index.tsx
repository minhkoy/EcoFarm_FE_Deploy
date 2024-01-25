import DefaultOverlay from '@/components/ui/overlay/DefaultOverlay'
import { setEnterpriseFilterParams } from '@/config/reducers/enterprise'
import { setFilterParams } from '@/config/reducers/packages'
import useFetchEnterprises from '@/hooks/queries/useFetchEnterprises'
import useFetchPackage from '@/hooks/queries/useFetchPackage'
import { useAppDispatch } from '@/hooks/redux/useAppDispatch'
import MainLayout from '@/layouts/common/main'
import { type QueryPackages } from '@/models/package.model'
import { SORTING_PACKAGE_TYPE, SORTING_PACKAGE_TYPE_NAME } from '@/utils/constants/enums'
import { Flex, Button as MantineButton, NumberFormatter, NumberInput, Select, Text, TextInput } from '@mantine/core'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Image
} from '@nextui-org/react'
import { capitalize, isEmpty } from 'lodash-es'
import { StarIcon } from 'lucide-react'
import { type GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import config from 'next-i18next.config.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { type NextPageWithLayout } from '../_app'
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
  const [filters, setFilters] = useState<QueryPackages>({
    limit: 10,
    page: 1,
    keyword: '',
    priceFrom: undefined,
    priceTo: undefined,
    enterpriseId: '',
    isStarted: undefined,
    isEnded: undefined,
    sortingPackageOrder: SORTING_PACKAGE_TYPE.Newest,
  })
  const appDispatch = useAppDispatch()
  const { t } = useTranslation()
  const router = useRouter()
  const { packageData, isLoading } = useFetchPackage()
  useEffect(() => {
    appDispatch(setFilterParams(filters));
  }, [appDispatch, filters])
  const { enterpriseData, isLoading: isLoadingEnterprises } = useFetchEnterprises();
  //const packageData = useMemo(() => queryResult?.data.value, [queryResult])
  // const onChange = useCallback(
  //   (e: ChangeEvent<HTMLSelectElement>) => {
  //   setFilters(prev => ({
  //     ...prev,
  //     limit: toNumber(e.target.value)
  //   }))
  //   },
  //   [],
  // )

  const onSubmitSearch = () => setFilters(filters)

  if (isLoading) {
    return (
      <DefaultOverlay />
    )
  }

  const maxPrice = 100000000 //100 trieu //packageData?.reduce((max, p) => p.price ?? 0 > max ? p.price ?? 0 : max, 0) ?? 0;
  return (
    <div className='grid grid-cols-3 gap-4'>
      <form className='col-span-3 flex flex-col bg-primary p-4 sm:col-span-1'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmitSearch();
          }
        }}
      >
        <div className='mb-4 flex flex-col gap-3'>
          <TextInput
            label='Tên gói farming'
            type='text'
            placeholder='Tên gói farming...'
            //placeholder={capitalize(t("info.name", { ns: "farm-package" }))}
            onChange={(e) => {
              appDispatch(setFilterParams({
                keyword: e.target.value
              }));
            }}
          />
          <Select
            label='Nhà cung cấp/ Chủ trang trại'
            placeholder='Nhà cung cấp/ Chủ trang trại'
            searchable
            onSearchChange={(val) => {
              appDispatch(setEnterpriseFilterParams({
                keyword: val
              }))
            }}
            data={enterpriseData?.map((enterprise) => ({
              value: enterprise.enterpriseId,
              label: enterprise.fullName,
            })) ?? []}
            onChange={(value) => {
              // appDispatch(setFilterParams({
              //   enterpriseId: value ?? ''
              // }))
              setFilters({
                ...filters,
                enterpriseId: value ?? ''
              })
            }}
          />
        </div>
        <div className='mb-4'>
          <Text size='sm' fw={'bold'}>Khoảng giá (VND)</Text>
          <div className='flex flex-row justify-between'>
            <NumberInput
              placeholder={'Từ giá'}
              thousandSeparator
              onChange={(e) => {
                setFilters({
                  ...filters,
                  priceFrom: Number(e),
                })
              }}
            />
            <NumberInput
              placeholder={'Đến giá'}
              thousandSeparator
              onChange={(e) => {
                setFilters({
                  ...filters,
                  priceTo: Number(e),
                })
              }}
            />
            {/* <Text size='sm' fw={'bold'}>Khoảng giá</Text>
            <RangeSlider
              color='orange'
              labelAlwaysOn
              min={0}
              max={maxPrice}
              step={1000}
              minRange={1000}
              defaultValue={[2000, maxPrice]}
              onChangeEnd={(e) => {
                setFilters({
                  ...filters,
                  priceFrom: e[0],
                  priceTo: e[1]
                })
              }}
              label={(value) => {
                return <NumberFormatter thousandSeparator value={value} suffix=' VND' />
              }} 
            /> */}
          </div>
        </div>
        <div className='mb-4'>
          <Checkbox
            isSelected={filters.isStarted}
            onValueChange={(e) => {
              setFilters({
                ...filters,
                isStarted: e,
              })
            }}
          >
            Đã bắt đầu
            {/* {capitalize(t('query-param.is-started', { ns: 'farm-package' }))} */}
          </Checkbox>
        </div>
        <div className='mb-4'>
          <Checkbox
            isSelected={filters.isEnded}
            onValueChange={(e) => {
              setFilters({
                ...filters,
                isEnded: e,
              })
            }}
          >
            Đã kết thúc
            {/* {capitalize(t('query-param.is-ended', { ns: 'farm-package' }))} */}
          </Checkbox>
          <Select
            m={3}
            label={'Sắp xếp theo'}
            placeholder={'Sắp xếp theo'}
            data={SORTING_PACKAGE_TYPE_NAME.map((item) => ({
              value: item.type.toString(),
              label: item.typeName,
            }))}
            value={filters.sortingPackageOrder?.toString()}
            onOptionSubmit={(val) => {
              //console.log(val);
              if (!val) {
                setFilters({
                  ...filters,
                  sortingPackageOrder: undefined
                })
                return;
              }
              setFilters({
                ...filters,
                sortingPackageOrder: val ? Number(val) : SORTING_PACKAGE_TYPE.Newest
              })
            }}
          />
        </div>
        <div className='mb-4 object-center'>
          <Button
            color='primary'
            onClick={onSubmitSearch}
          >
            {t('search', { ns: 'common' })}
          </Button>
        </div>
      </form>

      <div className='col-span-3 bg-primary p-4 sm:col-span-2'>
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
          {!packageData || (isEmpty(packageData) && filters.page === 1) ? (
            <Text c={'red'} fw={'bold'}>{capitalize('Không tìm thấy gói')}</Text>
          ) : (
            <>
              <p className='text-)primary-600 uppercase font-bold'>
                {capitalize(
                  t('info.farm-package', {
                    ns: 'farm-package',
                    total: packageData.length,
                  }),
                )}
              </p>
              <div className='grid grid-cols-3 justify-start gap-2'>
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
                        src={_package.avatarUrl ?? '/assets/brands/logo.png'}
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
                          <NumberFormatter thousandSeparator value={_package.price} suffix=' VND' />
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
              </div>
              <Flex direction={'row'} justify={'center'} gap={3}>
                <MantineButton color="indigo" disabled={filters.page! <= 1}
                  onClick={() => {
                    setFilters({
                      ...filters,
                      page: filters.page! - 1
                    })
                  }}
                >
                  {'<'}
                </MantineButton>
                <TextInput
                  min={1}
                  //width={50}
                  size="sm"
                  value={filters.page}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      appDispatch(setFilterParams(filters))
                    }
                  }}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      page: Number(e.currentTarget.value)
                    })
                  }}
                />
                <MantineButton color="indigo"
                  disabled={(packageData?.length) ? (packageData.length >= filters.limit! ? false : true) : true}
                  onClick={() => {
                    setFilters({
                      ...filters,
                      page: filters.page! + 1
                    })
                  }}
                > {'>'}
                </MantineButton>
              </Flex>

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
