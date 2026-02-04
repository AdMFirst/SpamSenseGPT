import { addUserData, getUserData } from '@/lib/data/user'
import { NextRequest, NextResponse } from 'next/server'
 
export async function POST(request: NextRequest) {
  const formdata = await request.formData()
  const uuid = formdata.get("uuid")
  if (!uuid ) {
    return NextResponse.json({ message: 'Validation error' }, { status: 422 })
  }
  try{
    const new_user = await addUserData(uuid.toString(), request)
    if (new_user) {
      return NextResponse.json({message: 'User created successfully', user: new_user}, {status: 201})
    } else {
      return NextResponse.json({message:"User already exists", user: await getUserData(uuid.toString())}, {status: 200})
    }
  } catch (err) {
    if( err instanceof Error ){
      if(process.env.NODE_ENV == "development") {
        return NextResponse.json(
          {
            message: err.message,
            request: {
              url: request.nextUrl,
            },
          },
          {
            status: 500
          }
        )
      } else {
        return NextResponse.json({message: err.message}, {status: 500})
      }
    }
    return NextResponse.json({message: "Something went wrong"}, {status: 500})
  }
}

