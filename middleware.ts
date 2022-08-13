import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { TOKEN_KEY } from '@constants/token'
import { SIGNUP_URL, LOGIN_URL, HOME_URL } from '@constants/pageUrl'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl
  const url = req.nextUrl.clone()
  if (pathname === SIGNUP_URL && req.cookies.get(TOKEN_KEY)) {
    url.pathname = HOME_URL
    return NextResponse.redirect(url)
  }
  if (pathname !== SIGNUP_URL && !req.cookies.get(TOKEN_KEY)) {
    url.pathname = LOGIN_URL
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: [
    '/create-menu',
    '/edit-menu/:path*',
    '/myInfo/:path*',
    '/user/:path*',
    '/signup'
  ]
}
