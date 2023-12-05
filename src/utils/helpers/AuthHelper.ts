import { deleteCookie, getCookies } from 'cookies-next'
import { keys } from 'lodash-es'
import { LINK_AUTH } from '../constants/links'

export const signOut = () => {
  const allCookies = getCookies()
  keys(allCookies).map((key) => deleteCookie(key))
  window.location.href = LINK_AUTH.LOGIN
}
