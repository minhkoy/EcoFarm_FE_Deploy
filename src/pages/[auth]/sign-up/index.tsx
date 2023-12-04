import { Datepicker } from '@/components/ui/datepicker'
import {
  Form,
  FormField,
  FormInput,
  FormItem,
  FormSelect,
} from '@/components/ui/form'
import { fontSansStyle } from '@/config/lib/fonts'
import { createSignUpSchema, type SignUpSchemaType } from '@/config/schema'
import AuthLayout from '@/layouts/auth'
import { type NextPageWithLayout } from '@/pages/_app'
import { LINK_AUTH } from '@/utils/constants/links'
import { SO_AccountType } from '@/utils/constants/selectOption'
import { dateFormat, dateParse } from '@/utils/helpers/DateHelper'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  SelectItem,
  cn,
} from '@nextui-org/react'
import { isValid } from 'date-fns'
import { capitalize, map, trim } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import config from 'next-i18next.config.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'auth', 'select'],
        config,
      )),
    },
  }
}

const SignUpScreen: NextPageWithLayout = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [dobInput, setDobInput] = useState('')
  const schema = useMemo(() => createSignUpSchema(t), [t])
  // ==================== React Hook Form ====================
  const rhf = useForm<SignUpSchemaType>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: SignUpSchemaType) => {
    console.log(values)
  }

  const handleChangeDate = (value: string) => {
    const inputVal = trim(value)
    const toDateInput = dateParse(inputVal, undefined, locale)
    if (isValid(toDateInput)) {
      rhf.setValue('dob', toDateInput)
    } else rhf.setValue('dob', null)
    setDobInput(inputVal)
  }

  return (
    <>
      <CardHeader className='flex h-1/3 items-center justify-center gap-2 sm:h-fit'>
        <Image
          src='/assets/brands/EcoFarm.svg'
          alt='logo'
          width={150}
          height={150}
        />
      </CardHeader>
      <CardBody>
        <Form {...rhf}>
          <form onSubmit={rhf.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={rhf.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    type='text'
                    variant='flat'
                    isRequired
                    label={capitalize(t('auth:field.your-username'))}
                    autoComplete={'off'}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={rhf.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    type='text'
                    variant='flat'
                    isRequired
                    label={capitalize(t('auth:field.your-email'))}
                    autoComplete={'off'}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={rhf.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    type='password'
                    variant='flat'
                    isRequired
                    label={capitalize(t('auth:field.your-password'))}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={rhf.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    type='password'
                    variant='flat'
                    isRequired
                    label={capitalize(t('auth:field.confirm-password'))}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={rhf.control}
              name='accountType'
              render={({ field }) => (
                <FormItem>
                  <FormSelect
                    {...field}
                    label={capitalize(t('auth:field.account-type'))}
                  >
                    {map(SO_AccountType, (item) => (
                      <SelectItem
                        style={{
                          ...fontSansStyle,
                        }}
                        key={item.value}
                        value={item.value}
                      >
                        {capitalize(
                          t('select:account-type.' + item.label, {
                            defaultValue: item.label,
                          }),
                        )}
                      </SelectItem>
                    ))}
                  </FormSelect>
                </FormItem>
              )}
            />
            <FormField
              control={rhf.control}
              name='dob'
              render={({ field }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    value={dobInput}
                    onChange={(e) => handleChangeDate(e.target.value)}
                    type='text'
                    variant='flat'
                    isRequired
                    fullWidth
                    label={capitalize(t('auth:field.your-dob'))}
                    autoComplete={'off'}
                    endContent={
                      <Datepicker
                        placement='top-end'
                        mode='single'
                        selected={field.value ?? undefined}
                        onSelect={(date) => {
                          if (!date) return
                          field.onChange(date)
                          setDobInput(dateFormat(date, 'P', locale))
                        }}
                      />
                    }
                  />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardBody>
      <CardFooter className='flex-col gap-3'>
        <Button
          onClick={rhf.handleSubmit(onSubmit)}
          color='primary'
          variant='solid'
          className='font-bold'
          fullWidth
        >
          {capitalize(t('common:sign-up'))}
        </Button>

        <div className='flex justify-center'>
          <span className='text-muted-foreground px-2 '>
            {capitalize(t('auth:have-account'))} ?
          </span>
          <Link href={LINK_AUTH.LOGIN} underline='hover' className=''>
            {cn(capitalize(t('common:login')), t('common:now'))}
          </Link>
        </div>
      </CardFooter>
      {/* <DevTool placement='bottom-left' control={rhf.control}  /> */}
    </>
  )
}

SignUpScreen.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>
}

export default SignUpScreen
