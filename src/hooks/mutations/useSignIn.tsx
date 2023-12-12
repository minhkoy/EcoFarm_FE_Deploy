import { loginApi } from '@/config/apis/authentication'
import { ACCESS_TOKEN } from '@/utils/constants/enums'
import { ToastHelper } from '@/utils/helpers/ToastHelper'
import { useMutation } from '@tanstack/react-query'
import { setCookie } from 'cookies-next'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export default function useSignIn() {
  const router = useRouter()
  const { t } = useTranslation()
  return useMutation({
    mutationKey: ['login'],
    mutationFn: loginApi,
    onSuccess: ({ data }) => {
      if (data.isSuccess) {
        ToastHelper.success(
          t('success', { ns: 'common' }),
          t('login.success', { ns: 'auth' }),
        )
        setCookie(ACCESS_TOKEN, data.value.accessToken)
        void router.reload()
      } else {
        ToastHelper.error(
          t('default-error.title', { ns: 'error' }),
          data.errors.join('. '),
        )
      }
    },
  })
}
