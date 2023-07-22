import { NextRequest, NextResponse, userAgent } from "next/server";

export default function middleware(request: NextRequest) {
    const response = NextResponse.next();

    const time = Date.now().toLocaleString();

    const logData = {
        time: time,
        url: request.nextUrl,
        ip: request.ip,
        ua: userAgent(request),
        geo: request.geo
    }

    console.log(logData);    
    
    return response
}

export const config = {
    matcher: '/api/:path*',
  }