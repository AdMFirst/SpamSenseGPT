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
        return NextResponse.json({ message: 'Validation error', request_body_schema:{
            pesan: "string", uuid: "string"
        } }, { status: 422 })
    }
    console.log("isi pesan: "+isiPesan)

    try {
        var user:User = await getUserData(uuid.toString());
        if (user.token < 1 ) {
            return NextResponse.json({message: 'error', payload: "Token tidak cukup, harap isi ulang token"}, {status: 402})
        }

        const response = await createResponse(isiPesan.toString());
        if (response) {
            await reduceToken(user);
            user = await getUserData(uuid.toString());
        }
        return NextResponse.json({message: 'success', payload: response, user: user}, {status: 200})
    } catch (error) {
        console.log(error);
        if (error instanceof DataNotFoundError) {
            return NextResponse.json({message: 'error', payload: error.message}, {status: 404})   
        }
        return NextResponse.json({message: 'error', payload: error}, {status: 500})   
    }
}