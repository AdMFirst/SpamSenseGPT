import DataNotFoundError from "../exceptions/data-not-found-error";
import { MongoClient } from "mongodb";
import User from "./models/user";
import { NextRequest } from "next/server";


const uri = process.env.MONGODB_CONNECTION_STRING || "";

export async function getUserData(uuid: string){
    const client = new MongoClient(uri);
    const db = client.db("prototype")
    const user_collection = db.collection<User>("user");

    const existingUser = await user_collection.findOne({uuid: uuid})

    if (existingUser) {
        return existingUser
    } else {
        throw new DataNotFoundError("no user found")
    }
}

export async function addUserData(uuid:string, metadata:NextRequest) {
    const client = new MongoClient(uri);
    const db = client.db("prototype")
    const user_collection = db.collection<User>("user");
    await user_collection.createIndex({uuid: 1}, {unique: true})

    var new_user:User = {
        uuid: uuid, token: 5,
        metadata: null
    }

    await user_collection.insertOne(new_user)
    return new_user
}