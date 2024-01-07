import DefaultOverlay from "@/components/ui/overlay/DefaultOverlay";
import TextTitle from "@/components/ui/texts/TextTitle";
import { setAddressFilterParams } from "@/config/reducers/address";
import { createOrderSchema, type CreateOrderSchemaType } from "@/config/schema/order";
import useRemoveFromCart from "@/hooks/mutations/cart/useRemoveFromCart";
import useCreateOrder from "@/hooks/mutations/orders/useCreateOrder";
import useFetchAddresses from "@/hooks/queries/useFetchAddresses";
import useGetMyShoppingCart from "@/hooks/queries/useGetMyShoppingCart";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import MainLayout from "@/layouts/common/main";
import { type CartDetail } from "@/models/cart.model";
import { PAYMENT_METHOD } from "@/utils/constants/enums";
import { Button, Card, Checkbox, Flex, Image, Modal, NumberFormatter, NumberInput, Select, Table, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { type NextPageWithLayout } from "../_app";

const CartScreen: NextPageWithLayout = () => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { cartData, isLoading } = useGetMyShoppingCart();
  const orderForm = useForm<CreateOrderSchemaType>({
    initialValues: {
      productId: '',
      quantity: 0,
      note: '',
      addressId: '',
      paymentMethod: null,
      cartProducts: []
    },
    validate: zodResolver(createOrderSchema()),
  })
  const { mutate: createOrderMutate, isPending: isPendingCreateOrder, rawData: rawCreateOrderResult } = useCreateOrder();
  const { mutate: removeFromCartMutate, isPending: isPendingRemoveFromCart } = useRemoveFromCart();
  const { addressData, isLoading: isLoadingAddress } = useFetchAddresses();
  const [quantities, setQuantities] = useState<Array<number>>(new Array<number>(cartData?.products?.length ?? 0).fill(1));
  const [selected, setSelected] = useState<Array<boolean>>(new Array<boolean>(cartData?.products?.length ?? 0).fill(true));
  const [isOpenOrderModal, { open, close }] = useDisclosure(false);
  if (isLoading) {
    return (
      <DefaultOverlay />
    )
  }
  if (!cartData || cartData.products!.length < 1) {
    return (
      <TextTitle>Giỏ hàng của bạn đang trống</TextTitle>
    )
  }

  const submitOrderModal = (
    <Modal
      title={<Text c={'teal'} fw={'bold'}>Đặt hàng</Text>}
      opened={isOpenOrderModal}
      onClose={close}
      size={'md'}
    >
      <Flex direction={'column'} gap={3}>
        <TextInput
          label={'Ghi chú'}
          placeholder={'Ghi chú'}
          {...orderForm.getInputProps('note')}
        />
        {
          isLoadingAddress ? <></> :
            <Select
              data={addressData?.map((address) => ({
                value: address.id,
                label: `${address.receiverName} - ${address.addressPhone} - ${address.addressDescription}`
              }))}
              checkIconPosition="right"
              label="Địa chỉ"
              searchable
              clearable
              nothingFoundMessage='Không tìm thấy địa chỉ nào'
              onSearchChange={(value) => {
                appDispatch(setAddressFilterParams({
                  keyword: value
                }))
              }}

              {...orderForm.getInputProps('addressId')}
            />
        }
        <Select
          label='Phương thức thanh toán'
          placeholder='Chọn phương thức thanh toán'
          data={PAYMENT_METHOD.map((method) => ({
            value: method[0]!.toString(),
            label: method[1]!
          }))}
          onChange={(val) => {
            orderForm.setFieldValue('paymentMethod', Number(val))
          }}
        //{...newOrderForm.getInputProps('paymentMethod')}
        />
        <Flex direction={'row'} gap={3} justify={'center'}>
          <Button
            color="teal"
            onClick={() => {
              const newOrderForm = orderForm.values;
              // newOrderForm.cartProducts = cartData.products?.map((product, index) => ({
              //   productId: product.productId,
              //   quantity: quantities[index]
              // }))
              createOrderMutate({
                ...newOrderForm,
                cartProducts: cartData.products!.map((product, index) => ({
                  productId: product.productId!,
                  quantity: selected[index] ? (quantities[index] ?? 0) : 0
                }))
              });
              if (rawCreateOrderResult?.status === 200) {
                void router.reload();
              }
            }}
            loading={isPendingCreateOrder}
          >
            Đặt hàng
          </Button>
          <Button
            color="gray"
            onClick={close}
          >
            Hủy
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )

  const products = cartData.products!;
  return (
    <Flex direction={'column'} gap={3}>
      <Flex direction={'row'} justify={'center'}>
        <TextTitle>Giỏ hàng của bạn</TextTitle>
      </Flex>
      <Card shadow="md" m={5}>
        <Table>
          <Table.Thead>
            <Table.Th></Table.Th>
            <Table.Th>STT</Table.Th>
            <Table.Th>Tên sản phẩm</Table.Th>
            <Table.Th>Số lượng còn lại</Table.Th>
            <Table.Th>Số lượng mua</Table.Th>
            <Table.Th>Đơn giá</Table.Th>
            <Table.Th>Thành tiền</Table.Th>
            <Table.Th>
              <Checkbox
                //defaultChecked
                onClick={(e) => {
                  const newSelected = [...selected];
                  newSelected.fill(e.currentTarget.checked);
                  setSelected(newSelected);

                }}
              />
            </Table.Th>
          </Table.Thead>
          <Table.Tbody>
            {
              products.map((item: CartDetail, index) => {
                return (
                  <Table.Tr>
                    <Table.Td>
                      <Image src={item.productImage ?? ''} alt="EcoFarm" w={300} h={100} />
                    </Table.Td>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>
                      <Link href={`/products/${item.productId}`} passHref>
                        <Text c="teal" fw={'bold'}>{item.productName}</Text>
                      </Link>
                    </Table.Td>
                    <Table.Td>{item.quantity}</Table.Td>
                    <Table.Td>
                      <NumberInput
                        value={quantities[index]}
                        min={1}
                        max={item.quantity ?? 1}
                        thousandSeparator
                        onChange={(e) => {
                          let val = Number(e);
                          if (val > (item.quantity ?? 0)) {
                            val = item.quantity ?? 0;
                            //return;
                          }
                          const newQuantities = [...quantities];
                          newQuantities[index] = val;
                          setQuantities(newQuantities);
                        }}
                      />
                    </Table.Td>
                    <Table.Td>
                      <NumberFormatter thousandSeparator value={item.productPrice} />
                    </Table.Td>
                    <Table.Td>
                      <NumberFormatter thousandSeparator value={(quantities[index] ?? 0) * (item.productPrice ?? 0)} />
                    </Table.Td>
                    <Table.Td>
                      <Checkbox
                        checked={selected[index]}
                        onChange={(e) => {
                          const newSelected = [...selected];
                          newSelected[index] = e.currentTarget.checked;
                          setSelected(newSelected);

                        }}
                      />
                    </Table.Td>
                  </Table.Tr>
                )
              })
            }
            <Table.Tr>
              <Table.Td colSpan={3}>

              </Table.Td>
              <Table.Td>
                <Text fw={'bold'} c={'teal'}>
                  Tổng số lượng
                </Text>
              </Table.Td>
              <Table.Td fw={'bold'}>
                {quantities.length > 0 ? quantities.reduce((accumulator, currentValue, index) => {
                  console.log(index)
                  console.log(accumulator)
                  if (!selected[index]) return accumulator;
                  return accumulator + currentValue;
                }, 0) : 0}
              </Table.Td>
              <Table.Td>
                <Text fw={'bold'} c={'teal'}>
                  Tổng giá tiền
                </Text>
              </Table.Td>
              <Table.Td fw={'bold'}>
                <NumberFormatter thousandSeparator value={
                  quantities.reduce((accumulator, currentValue, index) => {
                    if (!selected[index]) return accumulator;
                    return accumulator + currentValue * (products[index]?.productPrice ?? 0);
                  }, 0)
                } />
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
        {/* <p>{JSON.stringify(selected)}</p>
        <p>{JSON.stringify(quantities)}</p> */}
        <Flex direction={'row'} justify={'center'}>
          <Button color="teal"
            onClick={open}
          >
            Đặt hàng
          </Button>
        </Flex>
        {
          submitOrderModal
        }
      </Card>
    </Flex>
  )
}

CartScreen.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}
export default CartScreen;