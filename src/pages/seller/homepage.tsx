import TextTitle from "@/components/ui/texts/TextTitle";
import SellerLayout from "@/layouts/seller/sellerLayout";
import { Button, Card, Flex } from "@mantine/core";
import { useRouter } from "next/router";
import { type NextPageWithLayout } from "../_app";

const SellerHomepage: NextPageWithLayout = () => {
  const router = useRouter();
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