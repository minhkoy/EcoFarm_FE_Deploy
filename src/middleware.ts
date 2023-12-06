import { getCookie } from 'cookies-next'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { ACCESS_TOKEN } from './utils/constants/enums'
import { COMMON_LINK, LINK_AUTH } from './utils/constants/links'

export const middleware = (req: NextRequest) => {
  const res = NextResponse.next()
  const hasCookie = getCookie(ACCESS_TOKEN, { req, res })
  const isAuthPage = req.url.includes('auth')
  if (!hasCookie && !isAuthPage) {
    return NextResponse.redirect(new URL(LINK_AUTH.LOGIN, req.url))
  } else if (hasCookie && isAuthPage) {
    return NextResponse.redirect(new URL(COMMON_LINK.HOMEPAGE, req.url))
  } else {
    return res
  }
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|assets|favicon.ico).*)',
}
