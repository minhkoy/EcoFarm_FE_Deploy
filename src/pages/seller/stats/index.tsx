import DefaultOverlay from "@/components/ui/overlay/DefaultOverlay";
import TextTitle from "@/components/ui/texts/TextTitle";
import { setEnterpriseStatsParam } from "@/config/reducers/stats/enterprises";
import useFetchEnterpriseStat from "@/hooks/queries/useFetchEnterpriseStat";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import SellerLayout from "@/layouts/seller/sellerLayout";
import { type QueryEnterpriseStats } from "@/models/stats.model";
import { type NextPageWithLayout } from "@/pages/_app";
import { Flex, Grid, NumberFormatter, Table, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SellerStatsScreen: NextPageWithLayout = () => {
  const router = useRouter();
  const { stats: stat, isLoading } = useFetchEnterpriseStat();
  const appDispatch = useAppDispatch();
  const [queryStats, setQueryStats] = useState<QueryEnterpriseStats>({
    fromDate: undefined,
    toDate: undefined,
  });

  useEffect(() => {
    if (!router.isReady) return;
    appDispatch(setEnterpriseStatsParam(queryStats))
  }, [appDispatch, queryStats, router.isReady])
  if (isLoading) {
    return <DefaultOverlay />
  }
  return (
    <Flex direction={'column'} justify={'center'} gap={3}>
      <Flex direction={'row'} justify={'center'}>
        <TextTitle>Thống kê cho người bán</TextTitle>
      </Flex>
      <Flex direction={'row'} justify={'center'} gap={3}>
        <DatePickerInput
          placeholder="Thống kê từ ngày"
          w={200}
          valueFormat="DD-MM-YYYY"
          onChange={(val) => {
            setQueryStats({
              ...queryStats,
              fromDate: val!,
            })
          }}
        />
        <DatePickerInput
          placeholder="Đến ngày"
          w={200}
          valueFormat="DD-MM-YYYY"
          onChange={(val) => {
            setQueryStats({
              ...queryStats,
              toDate: val!,
            })
          }}
        />
      </Flex>
      <Grid columns={4}>
        <Grid.Col span={1}>
        </Grid.Col>
        <Grid.Col span={2}>
          <Table>
            <Table.Tr>
              <Table.Td>Tổng số gói được đăng ký trong tuần</Table.Td>
              <Table.Td>{stat?.totalRegisterPackageInTimeRange}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Tổng số sản phẩm được bán trong tuần</Table.Td>
              <Table.Td>{stat?.totalSoldProductInTimeRange}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Tổng doanh thu từ các đơn hoàn thành trong tuần</Table.Td>
              <Table.Td>
                <NumberFormatter thousandSeparator value={stat?.totalOrderPriceInTimeRange} /> VND
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Tổng doanh thu</Table.Td>
              <Table.Td>
                <NumberFormatter thousandSeparator value={stat?.totalOrderPriceSoFar} /> VND
              </Table.Td>
            </Table.Tr>
          </Table>
        </Grid.Col>
        <Grid.Col span={1}>
        </Grid.Col>

        <Grid.Col span={2}>
          <Flex direction={'column'}>
            <TextTitle>Các gói farming được đăng ký mới nhiều nhất trong tuần</TextTitle>
            <Table withTableBorder={false} withRowBorders={false}>
              <Table.Tr>
                <Table.Th>STT</Table.Th>
                <Table.Th>Tên gói</Table.Th>
                <Table.Th>Mã</Table.Th>
                <Table.Th>Số lượng đăng ký</Table.Th>
              </Table.Tr>
              {stat?.topRegisteredPackagesInTimeRange?.map((item, index) => (
                <Table.Tr>
                  <Table.Td>
                    <Text size="lg" c={'teal'} fw={'bold'}>{index + 1}</Text>
                  </Table.Td>
                  <Table.Td>{item.name}</Table.Td>
                  <Table.Td>{item.code}</Table.Td>
                  <Table.Td>{item.quantityRegistered}</Table.Td>
                </Table.Tr>
              ))}
            </Table>
          </Flex>
        </Grid.Col>
        <Grid.Col span={2}>
          <Flex direction={'column'}>
            <TextTitle>Các sản phẩm được bán nhiều nhất trong tuần</TextTitle>
            <Table withTableBorder={false} withRowBorders={false}>
              <Table.Tr>
                <Table.Th>STT</Table.Th>
                <Table.Th>Tên sản phẩm</Table.Th>
                <Table.Th>Mã</Table.Th>
                <Table.Th>Số lượng mua</Table.Th>
              </Table.Tr>
              {stat?.topSoldProductsInTimeRange?.map((item, index) => (
                <Table.Tr>
                  <Table.Td>
                    <Text size="lg" c={'teal'} fw={'bold'}>{index + 1}</Text>
                  </Table.Td>
                  <Table.Td>{item.name}</Table.Td>
                  <Table.Td>{item.code}</Table.Td>
                  <Table.Td>{item.quantity}</Table.Td>
                </Table.Tr>
              ))}
            </Table>
          </Flex>
        </Grid.Col>

      </Grid>
      {/* <p>{JSON.stringify(stat)}</p> */}
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
