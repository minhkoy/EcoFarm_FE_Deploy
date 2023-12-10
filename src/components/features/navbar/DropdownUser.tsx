import { ACCESS_TOKEN } from '@/utils/constants/enums'
import { signOut } from '@/utils/helpers/AuthHelper'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { getCookie } from 'cookies-next'
import { capitalize, upperFirst } from 'lodash-es'
import { LogOutIcon, UserCog2Icon } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

export default function DropdownUser() {
  const { t } = useTranslation(['common'])
  const token = getCookie(ACCESS_TOKEN)
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dropdown
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
      <DropdownMenu variant='flat' color='primary'>
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
          onClick={() => signOut()}
        >
          {capitalize(
            t('log-out', {
              ns: 'common',
            }),
          )}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
