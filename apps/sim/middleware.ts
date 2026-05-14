import { type NextRequest, NextResponse } from 'next/server'
import { generateRuntimeCSP } from '@/lib/core/security/csp'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Apply runtime CSP to workspace routes
  // This reads NEXT_PUBLIC_SOCKET_URL at request time, not build time
  const pathname = request.nextUrl.pathname

  if (
    pathname.startsWith('/workspace') ||
    pathname.startsWith('/w/') ||
    pathname === '/'
  ) {
    response.headers.set('Content-Security-Policy', generateRuntimeCSP())
  }

  return response
}

export const config = {
  matcher: [
    '/workspace/:path*',
    '/w/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
