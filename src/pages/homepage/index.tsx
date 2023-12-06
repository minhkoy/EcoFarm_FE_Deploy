import { type GetServerSideProps } from 'next'
import config from 'next-i18next.config.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { type NextPageWithLayout } from '../_app'
import MainLayout from '@/layouts/common/main'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'vi', ['common'], config)),
    },
  }
}

const HomepageScreen : NextPageWithLayout = () => {
  return (
    <div>
     Homepage
    </div>
  )
}

HomepageScreen.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}

export default HomepageScreen