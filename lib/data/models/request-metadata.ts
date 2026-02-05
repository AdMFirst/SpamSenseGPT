import { NextURL } from "next/dist/server/web/next-url"

export interface ThumbmarkMetadata {
    thumbmark?: string;
    visitorId?: string;
    requestId?: string;
    confidence?: unknown;
    components?: unknown;
    version?: string;
    raw?: unknown;
}

export default interface RequestMetadata {
    time: String,
    url: String,
    ip: String | null | undefined,
    ua: Object | null,
    geo: { 
        city?: string | undefined; 
        country?: string | undefined; 
        region?: string | undefined; 
        latitude?: string | undefined; 
        longitude?: string | undefined; 
    } | undefined,
    thumbmark?: ThumbmarkMetadata
}
