import DefaultOverlay from "@/components/ui/overlay/DefaultOverlay";
import { UserInfo } from "@/components/ui/personalInfo/UserInfo";
import TextTitle from "@/components/ui/texts/TextTitle";
import useFetchMyRegisteredPackages from "@/hooks/queries/useFetchMyRegisteredPackages";
import MainLayout from "@/layouts/common/main";
import { type QueryMyRegisteredPackages } from "@/models/package.model";
import { type NextPageWithLayout } from "@/pages/_app";
import { EFX } from "@/utils/constants/constants";
import { Card, Flex, Grid, Image, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

const YourPackagesScreen: NextPageWithLayout = () => {
  const router = useRouter();
  const queryForm = useForm<QueryMyRegisteredPackages>({
    initialValues: {
      keyword: '',
      enterpriseId: '',
      limit: EFX.DEFAULT_LIMIT,
      page: EFX.DEFAULT_PAGE,
      isActive: undefined,
      isFinished: undefined,
    }
  })
  const { packageData, isLoading } = useFetchMyRegisteredPackages();
  if (isLoading) {
    return <DefaultOverlay />
  }
  if (!packageData || packageData.length === 0) {
    return (
      <>
        <Flex direction={'row'} justify={'center'}>
          <TextTitle>Bạn chưa đăng ký gói farming nào.</TextTitle>
        </Flex>
        <Flex direction={'row'} justify={'center'}>
          <Text c={'blue'}>Hãy đăng ký thêm nhé!</Text>
        </Flex>
      </>
    )
  }

  return (
    <Grid columns={5}>
      <Grid.Col span={1}>
        <Card shadow="sm" m={5}>
          <UserInfo />
        </Card>
      </Grid.Col>
      <Grid.Col span={4}>
        <Flex direction={'column'} gap={3}>
          <Flex direction={'row'} justify={'center'}>
            <TextTitle>Các gói farming bạn đăng ký</TextTitle>
          </Flex>
          <Grid columns={3}>
            {packageData.map((pkg) => (
              <Grid.Col span={1}>
                <Card shadow="sm" m={5}
                  className="hover:cursor-pointer hover:bg-teal-100"
                  onClick={() => {
                    void router.push(`/packages/${pkg.id}`);
                  }}
                >
                  <Flex direction={'column'} gap={3}>
                    <Image src={pkg.avatarUrl} alt={pkg.name} height={'200'} />
                    <Text c={'teal'} fw={'bold'}>{pkg.name}</Text>
                    <Text c={'orange'} fw={'bold'}>{pkg.packageStatusName}</Text>
                  </Flex>
                </Card>
              </Grid.Col>
            ))
            }
          </Grid>
        </Flex>
      </Grid.Col>
    </Grid>
  )
}

YourPackagesScreen.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}
export default YourPackagesScreen;