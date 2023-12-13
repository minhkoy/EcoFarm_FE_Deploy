import { setPackageId } from '@/config/reducers/package'
import { type CreatePackageReviewSchemaType } from '@/config/schema'
import useCreatePackageReview from '@/hooks/mutations/useCreatePackageReview'
import useFetchPackageReviews from '@/hooks/queries/useFetchPackageReviews'
import useFetchSinglePackage from '@/hooks/queries/useFetchSinglePackage'
import { useAppDispatch } from '@/hooks/redux/useAppDispatch'
import MainLayout from '@/layouts/common/main'
import { type NextPageWithLayout } from '@/pages/_app'
import { getQueryUrlValue, splitDigits } from '@/utils/helpers/CommonHelper'
import { dateFormat } from '@/utils/helpers/DateHelper'
import { Button, Card, Image, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea } from '@nextui-org/react'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'


const PackageDetailScreen: NextPageWithLayout = () => {
  const { query } = useRouter()
  const [isAddingNewReview, setIsAddingNewReview] = useState(false);
  const packageId = useMemo(() => getQueryUrlValue(query, 0), [query])
  const [newReview, setNewReview] = useState<CreatePackageReviewSchemaType>({
    rating: 0,
    content: '',
    packageId: packageId!,
  });
  const appDispatch = useAppDispatch()
  appDispatch(setPackageId(packageId!))
  const { packageData, isLoading } = useFetchSinglePackage()

  // appDispatch(setFilterParams({
  //   packageId: packageId!
  // }))
  const { packageReviewsData } = useFetchPackageReviews(packageId)

  const loadRegisterButton = () => {
    if (packageData?.isRegisteredByCurrentUser) {
      return (
        <Button color='secondary' className='w-full mt-2' isDisabled>Đã đăng ký</Button>
      )
    }
    if (packageData?.closeRegisterTime) {
      return (
        <Button color='default' className='w-full mt-2' isDisabled>Đã đóng đăng ký</Button>
      )
    }
    return (
      <Button color='primary' className='w-full mt-2'>Đăng ký</Button>
    )
  }

  const { mutate: createPackageReviewMutate, isPending } = useCreatePackageReview()
  const addingNewReview = () => createPackageReviewMutate(newReview)

  if (isLoading) {
    return (
      <div>Loading....</div>
    )
  }
  return (
    <div className='flex flex-col gap-3 mb-5'>
      <Card className=' grid grid-cols-3 gap-3 ml-3 mr-3 p-4'>
        <div className=''>
          <Image
            height={1000}
            src='/assets/test/Carrot-farming.jpg'
            className=''
            alt='EcoFarm'
            width={500}
          />
          {
            loadRegisterButton()
          }
        </div>
        <div className='col-span-2'>
          <span className='text-primary-400 font-bold text-3xl'>{packageData?.name}</span>
          <Table hideHeader>
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>VALUE</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key={1}>
                <TableCell>Mã gói farming</TableCell>
                <TableCell>{packageData?.code}</TableCell>
              </TableRow>
              <TableRow key={2}>
                <TableCell>Giá gói farming</TableCell>
                <TableCell className='text-primary-400'>{splitDigits(packageData!.price!)} VND</TableCell>
              </TableRow>
              <TableRow key={3}>
                <TableCell>Đã đăng ký</TableCell>
                <TableCell>{packageData?.quantityRegistered}</TableCell>
              </TableRow>
              <TableRow key={4}>
                <TableCell>Số suất còn lại</TableCell>
                <TableCell>{packageData?.quantityRemain}</TableCell>
              </TableRow>
              <TableRow key={5}>
                <TableCell>Dự kiến bắt đầu</TableCell>
                <TableCell>{packageData?.estimatedStartTime ? dateFormat(new Date(packageData.estimatedStartTime), 'P', 'vi') : 'Không xác định'}</TableCell>
              </TableRow>
              <TableRow key={6}>
                <TableCell>Dự kiến kết thúc</TableCell>
                <TableCell>{packageData?.estimatedEndTime ? dateFormat(new Date(packageData.estimatedEndTime), 'P', 'vi') : 'Không xác định'}</TableCell>
              </TableRow>
              <TableRow key={7}>
                <TableCell>Đánh giá</TableCell>
                <TableCell>
                  <span className='inline font-semibold'>
                    {packageData?.averageRating}
                  </span> <Star className='inline h-1/2' color='yellow' />
                  {` (${packageData?.numbersOfRating} đánh giá)`}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
      <Card className='grid grid-cols-4 ml-3 mr-3 p-4'>
        <div className='col-span-3'>
          Nhà cung cấp <span className='text-lg text-primary-600 font-bold'>
            {packageData?.enterprise?.fullName}
          </span>
        </div>
        <div className='flex justify-items-end gap-3'>
          <Button color='primary' size='lg'>Xem thông tin</Button>
          <Button color='secondary' size='lg'>Nhắn tin</Button>
        </div>
      </Card>
      <Card className='ml-3 mr-3 p-4'>
        <div>
          <p className='text-primary-400 font-bold text-xl'>Mô tả</p>
          <textarea className='w-full h-16 bg-inherit' disabled value={packageData?.description} />
        </div>
      </Card>
      <Card className='ml-3 mr-3 p-4'>
        <div>
          <p className='text-primary-400 font-bold text-xl'>Hoạt động</p>
        </div>
      </Card>
      <Card className='ml-3 mr-3 p-4'>
        <div className='flex flex-col '>
          <div className='flex justify-between'>
            <p className='flex-1 mr-auto text-primary-400 font-bold text-xl'>Đánh giá ({packageReviewsData?.length})</p>
            <Button className='flex-1 w-1/4' fullWidth={false} color='primary'
              isDisabled={!(packageData?.isRegisteredByCurrentUser)}
              onClick={() => {
                setIsAddingNewReview(true)
              }}>Thêm đánh giá</Button>
          </div>
        </div>
        <div className='flex flex-col gap-3 mt-3'>
          {
            packageReviewsData?.map((review) => (
              <Card key={review.reviewId} className='flex flex-col gap-3 p-3'>
                <div className='flex gap-3'>
                  <div className='flex flex-col'>
                    <Link className='text-primary-400 font-bold text-lg'
                      href={`/user/${review.userId}`}>{review.userFullname}</Link>
                    <span className='text-gray-400 text-sm'>{dateFormat(new Date(review.createdAt!), 'P', 'vi')}</span>
                  </div>
                  <div className='flex-1'>
                    <span className='inline font-semibold'>
                      {review.rating}
                    </span> <Star className='inline h-3/4' color='yellow' />
                  </div>
                </div>
                <div>
                  <Textarea className='w-full text-xl bg-inherit' disabled value={review.content} />
                </div>
              </Card>
            ))
          }
          {
            isAddingNewReview && (
              <>
                <Card className='gap-3 p-3'>
                  <div>
                    <div className=''>
                      <span className='inline'>Đánh giá  </span>
                      <Select className='inline w-1/2 font-sans' fullWidth={false}
                        onChange={(e) => {
                          setNewReview({
                            ...newReview,
                            rating: Number(e.target.value)
                          })
                        }}>
                        <SelectItem key={0} value={0}>Không đánh giá</SelectItem>
                        <SelectItem key={1} value={1}>1</SelectItem>
                        <SelectItem key={2} value={2}>2</SelectItem>
                        <SelectItem key={3} value={3}>3</SelectItem>
                        <SelectItem key={4} value={4}>4</SelectItem>
                        <SelectItem key={5} value={5}>5</SelectItem>
                      </Select>
                    </div>
                    <Textarea
                      placeholder={'Nhập đánh giá của bạn (không bắt buộc)'}
                      className='w-full text-xl bg-inherit'
                      onChange={(e) => {
                        setNewReview({
                          ...newReview,
                          content: e.target.value
                        })
                      }}
                    />
                  </div>
                </Card>
                <div className='mr-3 flex flex-row gap-3'>
                  <Button color='primary' onClick={() => {
                    addingNewReview();
                    if (!isPending) {
                      setIsAddingNewReview(false)
                    }
                  }}>Đăng đánh giá</Button>
                  <Button color='default' onClick={() => {
                    setIsAddingNewReview(false)
                  }}>Trở về</Button>
                </div>
              </>
            )
          }
        </div>
      </Card>
    </div>
  )
}

PackageDetailScreen.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>
}
export default PackageDetailScreen
