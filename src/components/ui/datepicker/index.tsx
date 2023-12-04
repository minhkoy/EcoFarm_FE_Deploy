import { dateFormat } from '@/utils/helpers/DateHelper'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  type ButtonProps,
} from '@nextui-org/react'
import { CalendarIcon } from 'lucide-react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Calendar, type CalendarProps } from '../calender'

type DatepickerProps = CalendarProps & {
  size?: ButtonProps['size']
  variant: ButtonProps['variant']
}

export function Datepicker(props: DatepickerProps) {
  const { size, variant = 'light', mode = 'single' } = props
  const { t } = useTranslation()
  const [date, setDate] = useState<Date>()
  const { locale } = useRouter()
  return (
    <Popover placement='right'>
      <PopoverTrigger>
        <Button size={size} variant={variant} color='primary'>
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? (
            dateFormat(date, 'PPP', locale)
          ) : (
            <span>{t('common:pick-a-date')}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar mode={mode} selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
