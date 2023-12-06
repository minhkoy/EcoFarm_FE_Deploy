import {
  Form,
  FormField,
  FormInput,
  FormItem,
  FormSelect,
} from '@/components/ui/form'
import { signupApi } from '@/config/apis/authentication'
import { fontSansStyle } from '@/config/lib/fonts'
import { createSignUpSchema, type SignUpSchemaType } from '@/config/schema'
import AuthLayout from '@/layouts/auth'
import { type NextPageWithLayout } from '@/pages/_app'
import { LINK_AUTH } from '@/utils/constants/links'
import { SELECT_ACCOUNT_TYPE } from '@/utils/constants/selectOption'
import { ToastHelper } from '@/utils/helpers/ToastHelper'
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
import { useMutation } from '@tanstack/react-query'
import { capitalize, map } from 'lodash-es'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { type GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import config from 'next-i18next.config.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale ?? 'vi',
        ['common', 'auth', 'select'],
        config,
      )),
    },
  }
}

const defaultValues = {
  password: false,
  confirmPassword: false,
}

const SignUpScreen: NextPageWithLayout = () => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(defaultValues)

  const toggleVisibility = (type: keyof typeof defaultValues) =>
    setIsVisible((prev) => ({ ...prev, [type]: !prev[type] }))

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

  const { mutate: signUpMutate, isPending } = useMutation({
    mutationKey: ['signUp'],
    mutationFn: signupApi,
    onSuccess: ({ data }) => {
      if (data.isSuccess) {
        ToastHelper.success(
          t('success', { ns: 'common' }),
          capitalize(t('sign-up.success', { ns: 'auth' })),
        )
      } else {
        ToastHelper.error(
          t('error', { ns: 'common' }),
          data.validationErrors.map((v) => v.errorMessage).join('. '),
        )
      }
    },
  })

  const onSubmit = (values: SignUpSchemaType) => signUpMutate(values)

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
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    type={isVisible.password ? 'text' : 'password'}
                    endContent={
                      <Button
                        variant='light'
                        type='button'
                        isIconOnly
                        color={
                          fieldState.error && fieldState.isTouched
                            ? 'danger'
                            : 'default'
                        }
                        onClick={() => toggleVisibility('password')}
                      >
                        {isVisible.password ? (
                          <EyeOffIcon className='pointer-events-none text-inherit' />
                        ) : (
                          <EyeIcon className='pointer-events-none text-inherit' />
                        )}
                      </Button>
                    }
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
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormInput
                    {...field}
                    type={isVisible.confirmPassword ? 'text' : 'password'}
                    endContent={
                      <Button
                        variant='light'
                        type='button'
                        onClick={() => toggleVisibility('confirmPassword')}
                        isIconOnly
                        color={
                          fieldState.error && fieldState.isTouched
                            ? 'danger'
                            : 'default'
                        }
                      >
                        {isVisible.confirmPassword ? (
                          <EyeOffIcon className='pointer-events-none text-inherit' />
                        ) : (
                          <EyeIcon className='pointer-events-none text-inherit' />
                        )}
                      </Button>
                    }
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
                    {map(SELECT_ACCOUNT_TYPE, (item) => (
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
          isLoading={isPending}
          disabled={isPending}
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
