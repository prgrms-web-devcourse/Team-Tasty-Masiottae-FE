import { NextResponse } from 'next/server'
import { getToken } from '@utils/cookie'
import {
  CREATE_MENU_URL,
  EDIT_MENU_URL,
  MYINFO_URL,
  PASSWORD_CHANGE_URL,
  USER_URL,
  LOGIN_URL
} from '@constants/pageUrl'
import type { NextFetchEvent, NextRequest } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log(req.nextUrl.pathname, getToken())
  if (
    (req.nextUrl.pathname === CREATE_MENU_URL ||
      MYINFO_URL ||
      PASSWORD_CHANGE_URL) &&
    !getToken()
  ) {
    console.log('go to Login')
  }
}
