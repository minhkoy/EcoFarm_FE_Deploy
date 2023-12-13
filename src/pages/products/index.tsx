import { setFilterParams } from "@/config/reducers/products";
import useFetchProducts from "@/hooks/queries/useFetchProducts";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import MainLayout from "@/layouts/common/main";
import { type QueryProducts } from "@/models/product.model";
import { splitDigits } from "@/utils/helpers/CommonHelper";
import { Button, Card, CardBody, CardFooter, Image, Input } from "@nextui-org/react";
import { isEmpty } from "lodash-es";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
    packageId: ''
  })

  const router = useRouter()
  const appDispatch = useAppDispatch()
  const { productData, isLoading } = useFetchProducts()
  const onSubmitSearch = () => appDispatch(setFilterParams(filters));
  if (isLoading) {
    return <>Loading...</>
  }
  return (
    <>
      Length: {productData?.length}
      <div className='grid grid-cols-3 gap-4'>
        <form className='col-span-3 flex flex-col bg-primary p-4 sm:col-span-1'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSubmitSearch();
            }
          }}
        >
          <div className='mb-4'>
            <Input
              type='text'
              placeholder='Tên sản phẩm ...'
              onChange={(e) => {
                appDispatch(setFilterParams({
                  keyword: e.target.value
                }));
              }}
            />
          </div>
          <div className="mb-4">
            <div className=' flex flex-row justify-center gap-3'>
              <Input
                type='number'
                placeholder='Từ giá ...'
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    minimumPrice: Number(e.target.value)
                  })
                }}
              />
              <Input
                type='number'
                placeholder='Đến giá ...'
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    maximumPrice: Number(e.target.value)
                  })
                }}
              />
            </div>
          </div>
          <div className="mb-4">
            <div className=' flex flex-row justify-center gap-3'>
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
            </div>
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
              color='primary'
              onClick={onSubmitSearch}
            >
              Tìm kiếm
            </Button>
          </div>
        </form>
        <div className='col-span-3 bg-primary p-4 sm:col-span-2'>
          <div className=''>
            {isEmpty(productData) || !productData ? (
              //<p>{t('notFound.package', { ns: 'farm-package' })}</p>
              <p>Không tìm thấy sản phẩm</p>
            ) : (
              <>
                <p>
                  {/* {capitalize(
                  t('info.farm-package', {
                    ns: 'farm-package',
                    total: productData.length,
                  }),
                )} */}
                  Thông tin {productData.length} sản phẩm
                </p>
                {productData?.map((_product, index) => (
                  <Card
                    className='m-2 w-56'
                    shadow='md'
                    key={index}
                    isPressable
                    onPress={() => {
                      router.push(`./product/${_product.id}`)
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
                        <b>{_product.name}</b>
                        <p className='text-default-500'>
                          {splitDigits(_product.price!)} VND
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
                ))}
              </>
            )}
          </div>
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