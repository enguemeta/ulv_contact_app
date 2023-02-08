import csrf from 'edge-csrf';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Envs } from '@/utils/config';

const csrfProtect = csrf({
  cookie: {
    name: '_csrfSecret',
    path: '/',
    maxAge: undefined,
    domain: '',
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  },
  excludePathPrefixes: ['/_next/'],
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
  saltByteLength: 8,
  secretByteLength: 18,
  token: {
    responseHeader: 'X-CSRF-Token',
    value: undefined,
  },
});

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  //await csrfProtect(request, response);

  request.headers.set('Access-Control-Allow-Origin', Envs.BASE_URL || '');

  return response;
}
