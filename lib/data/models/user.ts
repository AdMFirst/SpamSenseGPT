import { NextRequest } from "next/server";

export default interface User {
    uuid:string,
    token: Number,
    metadata: {
        cookies: Array<Object>,

    } | null
}