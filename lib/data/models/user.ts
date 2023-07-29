import { NextRequest } from "next/server";
import RequestMetadata from "./request-metadata";

export default interface User {
    uuid:string,
    token: number,
    metadata: RequestMetadata | null
}