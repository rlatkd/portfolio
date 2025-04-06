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
  
  if (isExternalReferer && !hasActiveSession) {
    const response = NextResponse.redirect(new URL('/intro', request.url));
    response.cookies.set('xops', 'true', { 
      path: '/',
      // maxAge 설정하지 않으면 브라우저 세션 쿠키가 됨
    });
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
