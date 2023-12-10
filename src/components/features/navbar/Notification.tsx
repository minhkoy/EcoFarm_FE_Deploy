import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import { capitalize } from 'lodash-es'
import { BellIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Notification() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement='bottom-end'>
      <PopoverTrigger>
        <Button isIconOnly variant='light' color='primary'>
          <BellIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='relative h-52 w-40'>
        <figure>
          <Image
            src={'/assets/icons/empty-notif.svg'}
            alt='empty notification'
            fill
          />
        </figure>
        <p className='absolute bottom-0 -translate-y-8'>
          {capitalize(
            t('empty.notification', {
              ns: 'common',
            }),
          )}
        </p>
      </PopoverContent>
    </Popover>
  )
}
