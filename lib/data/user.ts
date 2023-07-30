import DataNotFoundError from "../exceptions/data-not-found-error";
import { MongoClient, MongoError } from "mongodb";
import User from "./models/user";
import { NextRequest, userAgent } from "next/server";
import RequestMetadata from "./models/request-metadata";
import clientPromise from "./mongodb";


const MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME || "prototype";

export async function getUserData(uuid: string){
    const client = await clientPromise;
    const db = client.db(MONGODB_DATABASE_NAME)
    const user_collection = db.collection<User>("user");

    const existingUser = await user_collection.findOne({uuid: uuid})


    if (existingUser) {
        return existingUser
    } else {
        throw new DataNotFoundError("no user found")
    }
}

export async function addUserData(uuid:string, request:NextRequest) {
    const client = await clientPromise;
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

    await user_collection.insertOne(new_user);
    return new_user 
}

export async function reduceToken(user: User) {
    const client = await clientPromise;
    const db = client.db(MONGODB_DATABASE_NAME)
    const user_collection = db.collection<User>("user");

    if (user.token < 1){
        throw new MongoError("token limit reached")
    }
    return await user_collection.updateOne(
        { uuid: user.uuid },
        { '$set': { token: (user.token - 1)}}
    );
}

