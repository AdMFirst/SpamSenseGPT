import { NextRequest, NextResponse, userAgent } from "next/server";
import RequestMetadata from "@/lib/data/models/request-metadata";

export default async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    const time = Date.now().toLocaleString();

    const logData: RequestMetadata = {
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