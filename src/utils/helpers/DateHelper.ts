import { format, formatDistance } from 'date-fns'
import en from 'date-fns/locale/en-US'
import vi from 'date-fns/locale/vi'

type DateFunction = (date: Date, formatStr?: string, locale?: string) => string

type DistanceFunction = (from: Date, to: Date, locale?: string) => string

export const dateFormat: DateFunction = (date, formatStr = 'P', locale) =>
  format(date, formatStr, {
    locale: whichLocale(locale),
  })

export const dateFormatDistance: DistanceFunction = (from, to, locale) =>
  formatDistance(from, to, {
    locale: whichLocale(locale),
  })

const whichLocale = (locale?: string) => (locale === 'vi' ? vi : en)
