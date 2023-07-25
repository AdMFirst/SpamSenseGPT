import DataNotFoundError from "../exceptions/data-not-found-error";
import { MongoClient } from "mongodb";
import User from "./models/user";
import { NextRequest, userAgent } from "next/server";
import RequestMetadata from "./models/request-metadata";


const uri = process.env.MONGODB_CONNECTION_STRING || "";
const MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME || "prototype";

export async function getUserData(uuid: string){
    const client = new MongoClient(uri);
    const db = client.db(MONGODB_DATABASE_NAME)
    const user_collection = db.collection<User>("user");

    const existingUser = await user_collection.findOne({uuid: uuid})
    await client.close()

    if (existingUser) {
        return existingUser
        
    } else {
        throw new DataNotFoundError("no user found")
    }
}

export async function addUserData(uuid:string, request:NextRequest) {
    const client = new MongoClient(uri);
    const db = client.db(MONGODB_DATABASE_NAME)
    const user_collection = db.collection<User>("user");
    await user_collection.createIndex({uuid: 1}, {unique: true})

    const time = (new Date()).toLocaleString();

    const logData: RequestMetadata = {
        time: time,
        url: request.nextUrl,
        ip: request.ip,
        ua: userAgent(request),
        geo: request.geo
    };

    var new_user:User = {
        uuid: uuid, token: 5,
        metadata: logData
    }

    await user_collection.insertOne(new_user)
    .then(async () => {
        await client.close()
    })
    return new_user 
}