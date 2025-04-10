import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith('/api/') || path.includes('_next') || path.includes('favicon.ico')) {
    return NextResponse.next();
  }
  
  const hasActiveSession = request.cookies.has('xops');
  const referer = request.headers.get('referer') || '';
  const hostname = request.headers.get('host') || '';
  const isExternalReferer = !referer || !referer.includes(hostname);
  
  if (path === '/intro') {
    return NextResponse.next();
  }
  
  // 외부에서 접속하고 쿠키가 없는 경우에만 intro로 리다이렉트
  if (isExternalReferer && !hasActiveSession) {
    return NextResponse.redirect(new URL('/intro', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
