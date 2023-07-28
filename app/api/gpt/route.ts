import { createResponse } from "@/lib/data/openai";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    const formdata = await req.formData()
    const isiPesan = formdata.get("pesan")
    if (!isiPesan ) {
        return NextResponse.json({ message: 'Validation error' }, { status: 422 })
    }
    

    try {
        const response = await createResponse(isiPesan.toString());
        return NextResponse.json({message: 'success', payload: response}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'error', payload: error}, {status: 500})   
    }
}