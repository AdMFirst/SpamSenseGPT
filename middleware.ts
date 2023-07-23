import { NextRequest, NextResponse, userAgent } from "next/server";
import Log from "@/lib/log/models/log";
import { write } from "@/lib/log/log"

export default async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    const time = Date.now().toLocaleString();

    const logData: Log = {
        time: time,
        url: request.nextUrl,
        ip: request.ip,
        ua: userAgent(request),
        geo: request.geo
    };
    
    console.log(logData)

    return response;
}

export const config = {
    matcher: '/api/:path*',
  }