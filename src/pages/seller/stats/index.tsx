import TextTitle from "@/components/ui/texts/TextTitle";
import SellerLayout from "@/layouts/seller/sellerLayout";
import { type NextPageWithLayout } from "@/pages/_app";
import { Flex } from "@mantine/core";

const SellerStatsScreen: NextPageWithLayout = () => {
  return (
    <Flex direction={'column'} justify={'center'}>
      <TextTitle>Thống kê cho người bán</TextTitle>
    </Flex>
  )
}

SellerStatsScreen.getLayout = function getLayout(page) {
  return (
    <SellerLayout>
      {page}
    </SellerLayout>
  )
}

export default SellerStatsScreen;
