import User from "@/lib/data/models/user";
import { createResponse } from "@/lib/data/openai";
import { getUserData, reduceToken } from "@/lib/data/user";
import DataNotFoundError from "@/lib/exceptions/data-not-found-error";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    const formdata = await req.formData()
    const isiPesan = formdata.get("pesan")
    const uuid = formdata.get("uuid");
    if (!isiPesan || !uuid) {
        return NextResponse.json({
            message: 'Validation error',
            request_body_schema: {
                pesan: "string",
                uuid: "string"
            }
        }, { status: 422 })
    }

    try {
        const user:User = await getUserData(uuid.toString());
        if (user.token < 1 ) {
            return NextResponse.json({message: 'Token limit reached, please replenish your tokens'}, {status: 402})
        }

        const response = await createResponse(isiPesan.toString());
        if (response) {
            await reduceToken(user);
            const updatedUser = await getUserData(uuid.toString());
            return NextResponse.json({message: 'success', payload: response, user: updatedUser}, {status: 200})
        }
        return NextResponse.json({message: 'Failed to analyze message'}, {status: 500})
    } catch (error) {
        if (error instanceof DataNotFoundError) {
            return NextResponse.json({message: error.message}, {status: 404})
        }
        if (error instanceof Error ) {
            return NextResponse.json({message: error.message}, {status: 500})
        }
        return NextResponse.json({message: 'Something went wrong'}, {status: 500})
    }
}