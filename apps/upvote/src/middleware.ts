import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  return NextResponse.rewrite(new URL('/chill', request.url));
}

export const config = {
  matcher: ['/'],
};
