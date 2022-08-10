import { NextResponse } from 'next/server'
import { getLocalToken } from '@utils/localToken'
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
  console.log(req.url, getLocalToken())
  if (
    (req.url === CREATE_MENU_URL || MYINFO_URL || PASSWORD_CHANGE_URL) &&
    getLocalToken() === null
  ) {
    return NextResponse.redirect(new URL(LOGIN_URL, req.url))
  }
}
