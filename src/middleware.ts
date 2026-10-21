import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/' || pathname === '/not-found') {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = '/not-found'

  return NextResponse.rewrite(url, { status: 404 })
}

export const config = {
  matcher: ['/((?!_next|api|adminku|not-found|.*\\..*).*)'],
}
