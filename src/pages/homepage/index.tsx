import TextTitle from '@/components/ui/texts/TextTitle'
import MainLayout from '@/layouts/common/main'
import { Card, Flex } from '@mantine/core'
import { type GetServerSideProps } from 'next'
import config from 'next-i18next.config.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { type NextPageWithLayout } from '../_app'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'vi', ['common'], config)),
    },

  }
}

const HomepageScreen: NextPageWithLayout = () => {
  return (
    <Flex direction={'column'} gap={3}>
      <Flex direction={'row'} justify={'center'}>
        <TextTitle>Chào mừng đến với EcoFarm!</TextTitle>
      </Flex>
      <Card shadow="sm" m={5}>
        <TextTitle>Các gói farming đang được quan tâm nhiều</TextTitle>
      </Card>
      <Card shadow="sm" m={5}>
        <TextTitle>Các sản phẩm bán chạy</TextTitle>
      </Card>
    </Flex>
  )
}

HomepageScreen.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}

export default HomepageScreen
