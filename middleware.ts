import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { TOKEN_KEY } from '@constants/token'
import {
  CREATE_MENU_URL,
  EDIT_MENU_URL,
  MYINFO_URL,
  PASSWORD_CHANGE_URL,
  USER_URL,
  LOGIN_URL,
  SIGNUP_URL
} from '@constants/pageUrl'
const TOKEN_REQUIRED_URL_LIST = [
  CREATE_MENU_URL,
  MYINFO_URL,
  PASSWORD_CHANGE_URL,
  EDIT_MENU_URL,
  USER_URL,
  SIGNUP_URL
]

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl
  if (
    TOKEN_REQUIRED_URL_LIST.includes(pathname) &&
    !req.cookies.get(TOKEN_KEY)
  ) {
    const url = req.nextUrl.clone()
    url.pathname = LOGIN_URL
    return NextResponse.redirect(`${url}`)
  }
}
