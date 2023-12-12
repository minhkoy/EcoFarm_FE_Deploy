import NextUiDropdown from '@/components/ui/dropdown'
import useAuth from '@/hooks/auth/useAuth'
import {
  Avatar,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn,
} from '@nextui-org/react'
import { capitalize, upperFirst } from 'lodash-es'
import { LogOutIcon, UserCog2Icon } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function DropdownUser() {
  const { locale, replace, pathname } = useRouter()
  const { t } = useTranslation(['common'])
  // const token = getCookie(ACCESS_TOKEN)
  const [isOpen, setIsOpen] = useState(false)
  const { logOut } = useAuth()
  return (
    <NextUiDropdown
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      closeOnSelect={false}
      placement='bottom-end'
    >
      <DropdownTrigger>
        <Avatar
          isBordered
          as='button'
          className='transition-transform'
          name='Jason Hughes'
          size='sm'
          color='primary'
          src='http://placekitten.com/g/200/300'
        />
      </DropdownTrigger>
      <DropdownMenu
        variant='flat'
        color='primary'
        onAction={(key) =>
          key.toString() === 'locale' &&
          replace(pathname, undefined, {
            locale: locale === 'vi' ? 'en' : 'vi',
          })
        }
      >
        <DropdownItem
          showDivider
          key='profile'
          className='h-14 cursor-default gap-2'
        >
          <p className='font-semibold'>
            {upperFirst(
              t('welcome', {
                ns: 'common',
                name: 'Jason Hughes',
              }),
            )}
          </p>
        </DropdownItem>
        <DropdownItem
          key='locale'
          endContent={
            <Image
              src={
                locale === 'vi'
                  ? '/assets/flags/vi.png'
                  : '/assets/flags/en.png'
              }
              alt={cn('logo-', locale)}
              width={20}
              height={20}
            />
          }
        >
          {locale === 'vi' ? 'Tiếng Việt' : 'English'}
        </DropdownItem>
        <DropdownItem
          key='profile'
          endContent={<UserCog2Icon className='h-4 w-4' />}
        >
          {capitalize(
            t('profile', {
              ns: 'common',
            }),
          )}
        </DropdownItem>
        <DropdownItem
          key='logout'
          color='danger'
          endContent={<LogOutIcon className='h-4 w-4' />}
          onClick={() => {
            logOut()
          }}
        >
          {capitalize(
            t('log-out', {
              ns: 'common',
            }),
          )}
        </DropdownItem>
      </DropdownMenu>
    </NextUiDropdown>
  )
}
