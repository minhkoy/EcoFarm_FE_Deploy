import TextTitle from "@/components/ui/texts/TextTitle";
import { setFilterParams } from "@/config/reducers/packages";
import { setProductFilterParams } from "@/config/reducers/products";
import useAuth from "@/hooks/auth/useAuth";
import useFetchPackage from "@/hooks/queries/useFetchPackage";
import useFetchProducts from "@/hooks/queries/useFetchProducts";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import SellerLayout from "@/layouts/seller/sellerLayout";
import { SORTING_PACKAGE_TYPE } from "@/utils/constants/enums";
import { Carousel } from "@mantine/carousel";
import { Button, Card, Flex, Image, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { type NextPageWithLayout } from "../_app";

const SellerHomepage: NextPageWithLayout = () => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { accountInfo } = useAuth();
  const { packageData, isLoading: isLoadingPackages } = useFetchPackage();
  const { productData, isLoading: isLoadingProducts } = useFetchProducts();
  useEffect(() => {
    if (!router.isReady) return;
    appDispatch(setFilterParams({
      enterpriseId: accountInfo?.accountEntityId,
      sortingPackageOrder: SORTING_PACKAGE_TYPE.Newest
    }))
    appDispatch(setProductFilterParams({
      enterpriseId: accountInfo?.accountEntityId,

    }))
  }, [accountInfo?.accountEntityId, appDispatch, router.isReady])
  return (
    <div>
      <Flex direction={'row'} justify={'center'}>
        <TextTitle>Chào mừng đến với trang quản lý của EcoFarm</TextTitle>
      </Flex>
      <Flex direction='column' gap={3}>
        <Card shadow="sm" m={5}>
          <Flex direction={'row'} justify={'space-between'}>
            <TextTitle>Các gói farming đang quản lý</TextTitle>
            <Button
              onClick={() => {
                void router.push('/seller/packages/');
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
                        void router.push(`/seller/packages/${item.id}`);
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
          <Flex direction={'row'} justify={'space-between'}>
            <TextTitle>Các sản phẩm</TextTitle>
            <Button
              onClick={() => {
                void router.push('/seller/products/');
              }}
            >Xem tất cả</Button>
          </Flex>
          <Carousel withIndicators height={300}
            slideSize={'20%'}
            slideGap={'md'}
            align={'start'}
            slidesToScroll={5}>
            {
              productData?.map((item) => {
                return (
                  <Carousel.Slide>
                    <Card shadow="sm" m={5} key={item.id}
                      className="flex flex-col items-center gap-3"
                      onClick={() => {
                        void router.push(`/seller/products/${item.id}`);
                      }}
                    >
                      <Image src={item.medias?.length ? item.medias[0]?.imageUrl : ''} alt={item.name}
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
          <TextTitle>Các đơn hàng</TextTitle>
        </Card>
      </Flex>
    </div>
  );
}

SellerHomepage.getLayout = function getLayout(page) {
  return (
    <SellerLayout>
      {page}
    </SellerLayout>
  );
}

export default SellerHomepage;