import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { localePrefix } from '@/app/navigation';

import { locales } from '../i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix,
});

export default function (request: NextRequest) {
  const { pathname } = request.nextUrl;
  // 非英文前缀全部重定向到根路径
  if (/^\/(cn|jp|de|es|fr|pt|ru|tw)(\/|$)/.test(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return intlMiddleware(request);
}
