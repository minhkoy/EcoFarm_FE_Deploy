import DefaultOverlay from "@/components/ui/overlay/DefaultOverlay";
import { UserInfo } from "@/components/ui/personalInfo/UserInfo";
import TextTitle from "@/components/ui/texts/TextTitle";
import { setOrderFilterParams } from "@/config/reducers/orders";
import useReceivedOrder from "@/hooks/mutations/orders/useReceivedOrder";
import useFetchOrders from "@/hooks/queries/useFetchOrders";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import MainLayout from "@/layouts/common/main";
import { type OrderModel, type QueryOrders } from "@/models/order.model";
import { type NextPageWithLayout } from "@/pages/_app";
import { EFX } from "@/utils/constants/constants";
import { ORDER_STATUS } from "@/utils/constants/enums";
import { dateFormat } from "@/utils/helpers/DateHelper";
import { Button, Card, Flex, Grid, Modal, NumberFormatter, NumberInput, Table, Text, type TableData } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CheckIcon, Undo2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const OrderScreen: NextPageWithLayout = () => {
  const { orderData, isLoading } = useFetchOrders();
  const appDispatch = useAppDispatch();
  const [isOpenDetailModal, { open: openDetailModal, close: closeDetailModal }] = useDisclosure(false);
  const { mutate: receivedOrderMutate } = useReceivedOrder();
  const [order, setOrder] = useState<OrderModel | undefined>(undefined);
  const [filterOrderParams, setFilterOrderParams] = useState<QueryOrders>({
    //enterpriseId: accountInfo?.accountEntityId,
    keyword: '',
    limit: EFX.DEFAULT_LIMIT,
    page: EFX.DEFAULT_PAGE,
    createdFrom: undefined,
    createdTo: undefined,
    status: undefined,

  })
  if (isLoading) {
    return (
      <DefaultOverlay />
    )
  }

  const cardDetail = (order: OrderModel): TableData => {
    return {
      body: [
        [<Text fw={'bold'} c={'teal'}>Mã đơn hàng</Text>, <Text>{order.orderCode}</Text>],
        [<Text fw={'bold'} c={'teal'}>Trạng thái</Text>, <Text>{order.statusName}</Text>],
        [<Text fw={'bold'} c={'teal'}>Tổng số tiền</Text>, <NumberFormatter thousandSeparator value={order.totalPrice} />],
        [<Text fw={'bold'} c={'teal'}>Ngày tạo</Text>, <Text>{dateFormat(new Date(order.createdAt), "dd/MM/yyyy HH:mm:ss", "vn")}</Text>]
      ]
    }
  }

  const confirmModal = (order: OrderModel | undefined) => {
    if (!order) return <></>;
    return (
      <Modal opened={isOpenDetailModal}
        onClose={closeDetailModal}
        title={<Text fw={'bold'} c={'teal'}>Chi tiết đơn hàng</Text>}
      >
        <Flex direction={'column'} gap={3} justify={'center'}>
          <Table withColumnBorders={false}>
            <Table.Tr>
              <Table.Td fw={'bold'}>Mã đơn hàng</Table.Td>
              <Table.Td>{order.orderCode}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td fw={'bold'}>Ngày tạo</Table.Td>
              <Table.Td>{dateFormat(new Date(order.createdAt), EFX.DATETIME_FORMAT, "vi")}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td fw={'bold'}>Trạng thái</Table.Td>
              <Table.Td fw={'bold'}>{order.statusName}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td fw={'bold'}>Ghi chú</Table.Td>
              <Table.Td>{order.note}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td fw={'bold'}>Địa chỉ</Table.Td>
              <Table.Td>{order.addressDescription}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td fw={'bold'}>Số điện thoại</Table.Td>
              <Table.Td>{order.receiverPhone}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td fw={'bold'}>Người nhận</Table.Td>
              <Table.Td>{order.receiverName}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td fw={'bold'}>Sản phẩm</Table.Td>
              <Table.Td color="teal">
                <Table>
                  <Table.Thead>
                    <Table.Th>STT</Table.Th>
                    <Table.Th>Mã sản phẩm</Table.Th>
                    <Table.Th>Tên sản phẩm</Table.Th>
                    <Table.Th>Số lượng</Table.Th>
                    <Table.Th>Đơn giá</Table.Th>
                    <Table.Th>Thành tiền</Table.Th>
                  </Table.Thead>
                  <Table.Tbody>
                    {
                      order.listProducts.map((product, index) => (
                        <Table.Tr>
                          <Table.Td>{index + 1}</Table.Td>
                          <Table.Td>{product.code}</Table.Td>
                          <Table.Td>
                            <Link href={`/seller/products/${product.id}`}>
                              <Text c={'teal'} fw={'bold'} component="a">{product.name}</Text>
                            </Link>
                          </Table.Td>
                          <Table.Td>{product.quantity}</Table.Td>
                          <Table.Td>
                            <NumberFormatter thousandSeparator value={product.price} />
                          </Table.Td>
                          <Table.Td>
                            <NumberFormatter thousandSeparator value={product.price! * product.quantity!} />
                          </Table.Td>
                        </Table.Tr>
                      ))
                    }
                  </Table.Tbody>
                </Table>
                {/* <Link href={`/seller/products/${order.listProducts[0]?.id}`}>
                  <Text c={'teal'} fw={'bold'} component="a">{order.listProducts[0]?.name}</Text>
                </Link> */}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td fw={'bold'}>Tổng số lượng</Table.Td>
              <Table.Td>{order.totalQuantity}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td fw={'bold'}>Tổng giá</Table.Td>
              <Table.Td color="teal" fw={'bold'}>
                <NumberFormatter thousandSeparator value={order.totalPrice} /> VND
              </Table.Td>
            </Table.Tr>
          </Table>
          <Flex direction={'row'} gap={3} justify={'space-between'}>
            <Button color="teal"
              disabled={order.status !== ORDER_STATUS.Shipped}
              leftSection={<CheckIcon />}
              onClick={() => {
                receivedOrderMutate(order.orderId);
                closeDetailModal();
              }}>Xác nhận đã nhận hàng
            </Button>
            <Button color="red"
              disabled={order.status === ORDER_STATUS.Shipped || order.status === ORDER_STATUS.Received}
              leftSection={<Undo2Icon />}
            >
              Hủy đơn hàng
            </Button>
          </Flex>
        </Flex>
      </Modal>
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
            <TextTitle>Các đơn hàng của bạn</TextTitle>
          </Flex>
          <Grid columns={3}>
            {
              orderData?.map((selectedOrder) => (
                <Grid.Col span={1}>
                  <Card shadow="sm" m={5}
                    onClick={() => { setOrder(selectedOrder); openDetailModal(); }}
                    className="cursor-pointer hover:bg-orange-100"
                  >
                    <Table data={cardDetail(selectedOrder)}>
                      {/* <Table.Tr>
                        <Table.Td>
                          Mã đơn hàng
                          </Table.Td>
                        <Table.Td>{order.orderCode}</Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td>Trạng thái</Table.Td>
                        <Table.Td>{order.statusName}</Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td>Tổng số tiền</Table.Td>
                        <Table.Td>
                          <NumberFormatter thousandSeparator value={order.totalPrice} />
                        </Table.Td>
                      </Table.Tr>
                      <Table.Tr>
                        <Table.Td>Ngày tạo</Table.Td>
                        <Table.Td>{dateFormat(new Date(order.createdAt), "dd/MM/yyyy HH:mm:ss", "vn")}</Table.Td>
                      </Table.Tr> */}
                    </Table>
                    {/* <Flex direction={'column'} gap={3}>
                      <Text>{order.orderCode}</Text>
                      <Text>{order.status}</Text>
                      <Text>{order.totalPrice}</Text>
                      <Text>{dateFormat(new Date(order.createdAt), "dd/MM/yyyy HH:mm:ss", "vn")}</Text>
                    </Flex> */}
                  </Card>
                  {
                    confirmModal(order)
                  }
                </Grid.Col>
              ))
            }
          </Grid>
          <Flex direction={'row'} justify={'center'} gap={3}>
            <Button color="indigo" disabled={filterOrderParams.page! <= 1}
              onClick={() => {
                setFilterOrderParams({
                  ...filterOrderParams,
                  page: filterOrderParams.page! - 1
                })
              }}
            >
              {'<'}
            </Button>
            <NumberInput
              min={1}
              //width={50}
              size="sm"
              value={filterOrderParams.page}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  appDispatch(setOrderFilterParams(filterOrderParams))
                }
              }}
              onChange={(e) => {
                setFilterOrderParams({
                  ...filterOrderParams,
                  page: Number(e)
                })
              }}
            />
            <Button color="indigo"
              disabled={(orderData?.length) ? (orderData.length >= filterOrderParams.limit! ? false : true) : true}
              onClick={() => {
                setFilterOrderParams({
                  ...filterOrderParams,
                  page: filterOrderParams.page! + 1
                })
              }}
            > {'>'} </Button>
          </Flex>
        </Flex>
      </Grid.Col>
    </Grid>
  )
}

OrderScreen.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}
export default OrderScreen;