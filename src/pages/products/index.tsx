import DefaultOverlay from "@/components/ui/overlay/DefaultOverlay";
import { setProductFilterParams } from "@/config/reducers/products";
import useFetchProducts from "@/hooks/queries/useFetchProducts";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import MainLayout from "@/layouts/common/main";
import { type QueryProducts } from "@/models/product.model";
import { SORTING_PRODUCT_TYPE, SORTING_PRODUCT_TYPE_NAME } from "@/utils/constants/enums";
import { Button, Flex, Grid, NumberFormatter, NumberInput, Select, Text, TextInput } from "@mantine/core";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { isEmpty } from "lodash-es";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type NextPageWithLayout } from "../_app";

const ProductList: NextPageWithLayout = () => {
  const [filters, setFilters] = useState<QueryProducts>({
    keyword: '',
    page: 1,
    limit: 10,
    isActive: true,
    maximumPrice: 0,
    minimumPrice: 0,
    minimumQuantity: 0,
    maximumQuantity: 0,
    packageId: '',
    id: '',
    code: '',
    enterpriseId: '',
    sortingProductOrder: SORTING_PRODUCT_TYPE.Newest
  })

  const router = useRouter()
  const appDispatch = useAppDispatch()
  const { productData, isLoading } = useFetchProducts()
  useEffect(() => {
    appDispatch(setProductFilterParams(filters))

  }, [appDispatch, filters])
  const onSubmitSearch = () => appDispatch(setProductFilterParams(filters));
  if (isLoading) {
    return (
      <DefaultOverlay />
    )
  }
  return (
    <>
      <div className='grid grid-cols-3 gap-4'>
        <form className='col-span-3 flex flex-col bg-yellow-50 shadow-md p-4 sm:col-span-1'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmitSearch();
            }
          }}
        >
          <div className='mb-4'>
            <TextInput
              label="Tên sản phẩm"
              placeholder='Tên sản phẩm ...'
              onChange={(e) => {
                appDispatch(setProductFilterParams({
                  keyword: e.target.value
                }));
              }}
            />
          </div>
          <div className="mb-4">
            <Text fw={'bold'} size="sm">Khoảng giá</Text>
            <div className=' flex flex-row justify-center gap-3'>
              <NumberInput
                min={0}
                //label="Khoảng giá"
                //type='number'
                placeholder='Từ giá ...'
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    minimumPrice: Number(e)
                  })
                }}
              />
              <NumberInput
                //type='number'
                min={0}
                placeholder='Đến giá ...'
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    maximumPrice: Number(e)
                  })
                }}
              />
            </div>
          </div>
          <div className="mb-4">
            {/* <div className=' flex flex-row justify-center gap-3'>
              <Input
                type='number'
                placeholder='Số lượng còn lại từ ...'
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    minimumQuantity: Number(e.target.value)
                  })
                }}
              />
              <Input
                type='number'
                placeholder='Số lượng còn lại đến ...'
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    maximumQuantity: Number(e.target.value)
                  })
                }}
              />

            </div> */}
            <Select
              m={3}
              label="Sắp xếp theo"
              placeholder={'Sắp xếp theo'}
              data={SORTING_PRODUCT_TYPE_NAME.map((item) => ({
                value: item.type.toString(),
                label: item.typeName,
              }))}
              value={filters.sortingProductOrder?.toString()}
              onChange={(val) => {
                //console.log(val);
                setFilters({
                  ...filters,
                  sortingProductOrder: val ? Number(val) : SORTING_PRODUCT_TYPE.Newest
                })

              }}
            />
          </div>
          <div className="mb-4">
            {/* <Input
                        type='text'
                        placeholder='Mã gói farming ...'
                        onChange={(e) => {
                            setFilters({
                                ...filters,
                                packageId: e.target.value
                            })
                        }}
                    /> */}
            <Button
              color='teal'
              onClick={onSubmitSearch}
            >
              Tìm kiếm
            </Button>
          </div>
        </form>
        <div className='col-span-3 p-4 sm:col-span-2'>
          <div className=''>
            {isEmpty(productData) || !productData ? (
              //<p>{t('notFound.package', { ns: 'farm-package' })}</p>
              <p>Không tìm thấy sản phẩm</p>
            ) : (
              <>
                <p className='text-primary-600 font-bold uppercase '>
                  {/* {capitalize(
                  t('info.farm-package', {
                    ns: 'farm-package',
                    total: productData.length,
                  }),
                )} */}
                  {/* {t('info', { ns: 'product', total: productData.length, })} */}
                  Thông tin các sản phẩm
                </p>
                <Grid columns={3}>
                  {productData?.map((_product, index) => (
                    <Grid.Col span={1}>
                      <Card
                        className='m-2 w-56'
                        shadow='lg'
                        key={index}
                        isPressable
                        onPress={() => {
                          router.push(`./products/${_product.id}`)
                        }}
                      >
                        <CardBody className='overflow-visible p-0'>
                          <Image
                            src={_product.medias?.length ? _product.medias[0]?.imageUrl : '/assets/brands/logo.png' ?? '/assets/brands/logo.png'}
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
                            <b>{_product.name}</b>
                            <p className='text-default-500'>
                              <NumberFormatter thousandSeparator value={_product.price} suffix=' VND' />
                            </p>
                          </div>
                          {/* <div className='m-2'>
                    <span className='font-bold'>
                      {_product.averageRating}
                      <StarIcon className='h-4 w-4 text-yellow-500' />
                    </span>
                  </div> */}
                        </CardFooter>
                      </Card>
                    </Grid.Col>

                  ))}
                </Grid>

              </>
            )}
          </div>
          <Flex direction={'row'} justify={'center'} gap={3}>
            <Button color="indigo" disabled={filters.page! <= 1}
              onClick={() => {
                setFilters({
                  ...filters,
                  page: filters.page! - 1
                })
              }}
            >
              {'<'}
            </Button>
            <TextInput
              min={1}
              //width={50}
              size="sm"
              value={filters.page}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  appDispatch(setProductFilterParams(filters))
                }
              }}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  page: Number(e.currentTarget.value)
                })
              }}
            />
            <Button color="indigo"
              disabled={(productData?.length) ? (productData.length >= filters.limit! ? false : true) : true}
              onClick={() => {
                setFilters({
                  ...filters,
                  page: filters.page! + 1
                })
              }}
            > {'>'} </Button>
          </Flex>
        </div>
      </div>
    </>
  )
}

ProductList.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default ProductList;