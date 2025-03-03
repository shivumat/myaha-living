import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('Middleware triggered for:', pathname);

  // Allow API routes, Next.js internal files, static assets, and the coming-soon page
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/coming-soon') ||
    pathname.startsWith('/about-us') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/colaborate') ||
    pathname.startsWith('/privacy') ||
    pathname.startsWith('/shipping') ||
    pathname.startsWith('/cancellation') ||
    pathname.startsWith('/terms') ||
    pathname.startsWith('/images') || // Allow images in /public/images
    pathname.startsWith('/assets') || // Allow if stored in /public/assets
    pathname.startsWith('/logo.png') // Allow specific files in /public
  ) {
    console.log('Middleware: Allowed route', pathname);
    return NextResponse.next();
  }

  // Redirect all other routes to /coming-soon
  console.log('Middleware: Redirecting', pathname);
  return NextResponse.redirect(new URL('/coming-soon', request.url));
}

// Apply middleware globally
export const config = {
  matcher: '/:path*',
};
