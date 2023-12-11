import { useRouter } from 'next/router'
import MainLayout from '@/layouts/common/main'
import { type NextPageWithLayout } from '@/pages/_app'
import { getQueryUrlValue, splitDigits } from '@/utils/helpers/CommonHelper'
import { useMemo } from 'react'
import useFetchSinglePackage from '@/hooks/queries/useFetchSinglePackage'
import { dateFormat } from '@/utils/helpers/DateHelper'
import { useAppDispatch } from '@/hooks/redux/useAppDispatch'
import { setPackageId } from '@/config/reducers/package'
import { Button, Card, Image, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Star } from 'lucide-react'
import useFetchPackageReviews from '@/hooks/queries/useFetchPackageReviews'
import { setFilterParams } from '@/config/reducers/packageReviews'
import { useAppSelector } from '@/hooks/redux/useAppSelector'


const PackageDetailScreen: NextPageWithLayout = () => {
  const { query, route: router } = useRouter()
  const packageId = useMemo(() => getQueryUrlValue(query, 0), [query])
  const appDispatch = useAppDispatch()
  appDispatch(setPackageId(packageId!))
  const { packageData, isLoading } = useFetchSinglePackage()

  // appDispatch(setFilterParams({
  //   packageId: packageId!
  // }))
  const { packageReviewsData, isLoading: isLoadingReviews} = useFetchPackageReviews(packageId)

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
  console.log(packageData?.isRegisteredByCurrentUser)
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
            isDisabled={!(packageData?.isRegisteredByCurrentUser)}>Thêm đánh giá</Button>
          </div>          
        </div>
        <div className='flex flex-col gap-3 mt-3'>
          {
            packageReviewsData?.map((review) => (
              <Card key={review.reviewId} className='flex flex-col gap-3 p-3'>
                <div className='flex gap-3'>
                  <div className='flex flex-col'>
                    <a className='text-primary-400 font-bold text-lg'
                      href={`/user/${review.userId}`}>{review.userFullname}</a>
                    <span className='text-gray-400 text-sm'>{dateFormat(new Date(review.createdAt!), 'P', 'vi')}</span>
                  </div>
                  <div className='flex-1'>
                    <span className='inline font-semibold'>
                      {review.rating}
                    </span> <Star className='inline h-3/4' color='yellow' />
                  </div>
                </div>
                <div>
                  <textarea className='w-full h-16 bg-inherit' disabled value={review.content} />
                </div>
              </Card>
            ))
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
