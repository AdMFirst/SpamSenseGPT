import { addUserData, getUserData } from '@/lib/data/user'
import { NextRequest, NextResponse } from 'next/server'
 
export async function POST(request: NextRequest) {
  const formdata = await request.formData()
  const uuid = formdata.get("uuid")
  if (!uuid ) {
    return NextResponse.json({ message: 'Validation error' }, { status: 403 })
  }
  try{
    const new_user = await addUserData(uuid.toString(), request)
    return NextResponse.json({message: 'User created succefully', user: new_user}, {status: 201})
  } catch (err:any) {
    if( err instanceof Error){ 
      if(process.env.NODE_ENV == "development") {
        return NextResponse.json(
          {
            message: err.message, 
            request: {
              ip: request.ip,
              geo: request.geo,
              url: request.nextUrl,
              cookies:request.cookies.getAll(),
              cache: request.cache,
              credential: request.credentials,
              destination: request.destination,
              headers: request.headers,
              integrity: request.integrity,
              method: request.method,
              mode:request.mode,
              redirect: request.redirect,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy,
              signal: request.signal,
            },
            nextRequest: request as Object
          }, 
          {
            status: 500
          }
        )
      }
      return NextResponse.json({message: err.message}, {status: 500})
    }
    return NextResponse.json({message: "Something went wrong"}, {status: 500})
  }
}

