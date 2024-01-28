import DefaultOverlay from "@/components/ui/overlay/DefaultOverlay";
import TextTitle from "@/components/ui/texts/TextTitle";
import { setAddressFilterParams } from "@/config/reducers/address";
import { type RemoveFromCartSchemaType } from "@/config/schema/cart";
import { createOrderSchema, type CreateOrderSchemaType } from "@/config/schema/order";
import useRemoveFromCart from "@/hooks/mutations/cart/useRemoveFromCart";
import useCreateOrder from "@/hooks/mutations/orders/useCreateOrder";
import useFetchAddresses from "@/hooks/queries/useFetchAddresses";
import useGetMyShoppingCart from "@/hooks/queries/useGetMyShoppingCart";
import { useAppDispatch } from "@/hooks/redux/useAppDispatch";
import MainLayout from "@/layouts/common/main";
import { type CartDetail } from "@/models/cart.model";
import { PAYMENT_METHOD } from "@/utils/constants/enums";
import { Button, Card, Checkbox, Flex, Grid, Image, Modal, NumberFormatter, NumberInput, Select, Table, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Trash2Icon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { type NextPageWithLayout } from "../_app";

const CartScreen: NextPageWithLayout = () => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { cartData, isLoading } = useGetMyShoppingCart();
  const { addressData, isLoading: isLoadingAddress } = useFetchAddresses();
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
  const [quantities, setQuantities] = useState<Array<number>>([]);
  const [selected, setSelected] = useState<Array<boolean>>([]);
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    setQuantities(new Array<number>(cartData?.products?.length ?? 0).fill(1));
    setSelected(new Array<boolean>(cartData?.products?.length ?? 0).fill(false));
  }, [cartData?.products?.length, router.isReady])
  const { mutate: createOrderMutate, isPending: isPendingCreateOrder, rawData: rawCreateOrderResult } = useCreateOrder();
  const { mutate: removeFromCartMutate, isPending: isPendingRemoveFromCart } = useRemoveFromCart();

  const [isOpenOrderModal, { open, close }] = useDisclosure(false);
  const [isOpenConfirmDeleteOneModal, { open: openConfirmDeleteOneModal, close: closeConfirmDeleteOneModal }] = useDisclosure(false);
  const [isOpenConfirmDeleteModal, { open: openConfirmDeleteModal, close: closeConfirmDeleteModal }] = useDisclosure(false);
  const [selectedItem, setSelectedItem] = useState({
    item: undefined as CartDetail | undefined,
    index: 0
  })
  if (isLoading) {
    return (
      <DefaultOverlay />
    )
  }
  if (!cartData?.products || cartData.products.length < 1) {
    return (
      <TextTitle>Giỏ hàng của bạn đang trống. Vui lòng thêm các sản phẩm khác vào giỏ.</TextTitle>
    )
  }

  const products = cartData.products;
  const totalSelectedQuantity = quantities.length > 0 ? quantities.reduce((accumulator, currentValue, index) => {
    console.log(index)
    console.log(accumulator)
    if (!selected[index]) return accumulator;
    return accumulator + currentValue;
  }, 0) : 0;
  const productSelectedCount = selected.reduce((accumulator, currentValue) => {
    if (currentValue) return accumulator + 1;
    return accumulator;
  }, 0)

  const confirmDeleteOneProductModal = (cartDetail: CartDetail | undefined, index: number) => (
    (!cartDetail) ? <></> :
      <Modal
        title={<Text c={'teal'} fw={'bold'}>Xóa sản phẩm</Text>}
        opened={isOpenConfirmDeleteOneModal}
        onClose={closeConfirmDeleteOneModal}
        size={'sm'}

      >
        <Flex direction={'column'} gap={5}>
          <Text className="inline">Bạn có muốn xóa sản phẩm <b>{cartDetail.productName ?? 'này'}</b> khỏi giỏ hàng?</Text>
          <Flex direction={'row'} justify={'right'} gap={3}>
            <Button
              color="red"
              leftSection={<Trash2Icon />}
              onClick={() => {
                const newSelected = [...selected];
                const newQuantities = [...quantities];
                const newProducts = [...cartData.products!];
                newSelected.splice(index, 1);
                newQuantities.splice(index, 1);
                newProducts.splice(index, 1);
                setSelected(newSelected);
                setQuantities(newQuantities);
                removeFromCartMutate({
                  productIds: [cartDetail.productId!],
                  cartId: cartData.id!
                });
                closeConfirmDeleteOneModal();
              }}
            >
              Xóa
            </Button>
            <Button
              color="gray"
              onClick={closeConfirmDeleteOneModal}
            >
              Hủy
            </Button>
          </Flex>
        </Flex>
      </Modal>
  )
  const confirmDeleteModal = (
    <Modal
      title={<Text c={'teal'} fw={'bold'}>Xóa sản phẩm</Text>}
      opened={isOpenConfirmDeleteModal}
      onClose={closeConfirmDeleteModal}
      size={'sm'}
    >
      <Flex direction={'column'} gap={3}>
        <Text>Bạn có chắc chắn muốn xóa {productSelectedCount} sản phẩm này khỏi giỏ hàng?</Text>
        <Flex direction={'row'} gap={3} justify={'center'}>
          <Button
            color="red"
            onClick={() => {
              const request: RemoveFromCartSchemaType = {
                productIds: products.filter((product, index) => product.productId !== undefined && selected[index] === true).map((product) => product.productId!) ?? [],
                cartId: cartData.id!
              }
              console.log(request);
              // const newSelected = [...selected];
              // const newQuantities = [...quantities];
              // const newProducts = [...cartData.products!];
              // for (let i = 0; i < newSelected.length; i++) {
              //   if (newSelected[i]) {
              //     newSelected.splice(i, 1);
              //     newQuantities.splice(i, 1);
              //     newProducts.splice(i, 1);
              //     i--;
              //   }
              // }
              // setSelected(newSelected);
              // setQuantities(newQuantities);
              removeFromCartMutate(request);
              closeConfirmDeleteModal();
            }}
            loading={isPendingRemoveFromCart}
          >
            Xóa
          </Button>
          <Button
            color="gray"
            onClick={closeConfirmDeleteModal}
          >
            Hủy
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
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
                label: `${address.receiverName} - ${address.addressPhone} - ${address.addressDescription} ${address.isPrimary ? '(Mặc định)' : ''}`
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

  return (
    <Flex direction={'column'} gap={3}>
      {/* <Flex direction={'row'} justify={'center'}>
        <TextTitle>Giỏ hàng của bạn</TextTitle>
      </Flex> */}
      <Grid columns={3}>
        <Grid.Col span={1}></Grid.Col>
        <Grid.Col span={1}>
          <TextTitle>Giỏ hàng của bạn</TextTitle>
        </Grid.Col>
        <Grid.Col span={1}>
          <Button
            leftSection={<TrashIcon />}
            color="red"
            mt={3}
            disabled={!selected.includes(true)}
            onClick={() => {
              openConfirmDeleteModal();
            }}
          >
            Xóa các sản phẩm chọn
          </Button>
          {
            confirmDeleteModal
          }
        </Grid.Col>
      </Grid>
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
            <Table.Th></Table.Th>
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
                    <Table.Td>
                      <Button
                        //rightSection={<Trash2Icon />}
                        color="red"
                        onClick={() => {
                          setSelectedItem({
                            item: item,
                            index: index
                          });
                          openConfirmDeleteOneModal();
                        }}
                        loading={isPendingRemoveFromCart}
                      >
                        <Trash2Icon />
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                )
              })
            }
            {
              confirmDeleteOneProductModal(selectedItem.item, selectedItem.index)
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
                {/* {quantities.length > 0 ? quantities.reduce((accumulator, currentValue, index) => {
                  console.log(index)
                  console.log(accumulator)
                  if (!selected[index]) return accumulator;
                  return accumulator + currentValue;
                }, 0) : 0} */}
                {totalSelectedQuantity}
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