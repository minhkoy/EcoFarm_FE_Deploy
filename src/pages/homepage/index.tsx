import TextTitle from '@/components/ui/texts/TextTitle'
import { setFilterParams } from '@/config/reducers/packages'
import { setProductFilterParams } from '@/config/reducers/products'
import useFetchPackage from '@/hooks/queries/useFetchPackage'
import useFetchProducts from '@/hooks/queries/useFetchProducts'
import { useAppDispatch } from '@/hooks/redux/useAppDispatch'
import MainLayout from '@/layouts/common/main'
import { SORTING_PACKAGE_TYPE, SORTING_PRODUCT_TYPE } from '@/utils/constants/enums'
import { Carousel } from '@mantine/carousel'
import { Button, Card, Flex, Image, Text } from '@mantine/core'
import { type GetServerSideProps } from 'next'
import config from 'next-i18next.config.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { type NextPageWithLayout } from '../_app'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'vi', ['common'], config)),
    },

  }
}

const HomepageScreen: NextPageWithLayout = () => {
  const appDispatch = useAppDispatch();
  const router = useRouter();
  const { packageData, isLoading: isLoadingPackages } = useFetchPackage();
  const { productData, isLoading: isLoadingProducts } = useFetchProducts();
  useEffect(() => {
    appDispatch(setFilterParams({
      sortingPackageOrder: SORTING_PACKAGE_TYPE.MostRegisterInWeek,
      enterpriseId: undefined,
    }));
    appDispatch(setProductFilterParams({
      sortingProductOrder: SORTING_PRODUCT_TYPE.MostSoldInWeek,
      enterpriseId: '',
      id: '',
      keyword: ''
    }))
  }, [appDispatch])
  return (
    <Flex direction={'column'} gap={3}>
      <Flex direction={'row'} justify={'center'}>
        <TextTitle>Chào mừng đến với EcoFarm!</TextTitle>
      </Flex>
      <Card shadow="sm" m={5}>
        <Flex direction={'row'} justify={'space-between'}>
          <TextTitle>Các gói farming đang được quan tâm nhiều</TextTitle>
          <Button
            onClick={() => {
              void router.push('/packages/');
            }}
          >Xem tất cả</Button>
        </Flex>
        <Carousel withIndicators height={300}
          slideSize={'20%'}
          slideGap={'md'}
          align={'start'}
          slidesToScroll={5}
        >
          {
            packageData?.map((item) => {
              return (
                <Carousel.Slide>
                  <Card shadow="sm" m={5} key={item.id}
                    className="flex flex-col items-center gap-3"
                    onClick={() => {
                      void router.push(`/packages/${item.id}`);
                    }}
                  >
                    <Image src={item.avatarUrl} alt={item.name}
                      height={50}
                    />
                    <Text c={'blue'} mb={3}>{item.name}</Text>
                  </Card>
                </Carousel.Slide>
              )
            })
          }
        </Carousel>
      </Card>
      <Card shadow="sm" m={5}>
        <TextTitle>Các sản phẩm bán chạy</TextTitle>
        <Carousel withIndicators height={300}
          slideSize={'20%'}
          slideGap={'md'}
          align={'start'}
          slidesToScroll={5}
        >
          {
            productData?.map((item) => {
              return (
                <Carousel.Slide>
                  <Card shadow="sm" m={5} key={item.id}
                    className="flex flex-col items-center gap-3"
                    onClick={() => {
                      void router.push(`/products/${item.id}`);
                    }}
                  >
                    <Image src={item.medias?.length ? item.medias[0]?.imageUrl : '/assets/brands/logo.png'} alt={item.name}
                      height={50}
                    />
                    <Text c={'blue'} mb={3}>{item.name}</Text>
                  </Card>
                </Carousel.Slide>
              )
            })
          }
        </Carousel>
      </Card>
    </Flex>
  )
}

HomepageScreen.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}

export default HomepageScreen
