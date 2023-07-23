import { MongoClient } from "mongodb";
import { NextRequest } from "next/server";
import Log from "./models/log";

const uri = process.env.MONGODB_CONNECTION_STRING || "";

export async function write(logObject: Log) {
    const client = new MongoClient(uri);
    const db = client.db("prototype")
    const user_collection = db.collection<Log>("logs");

    await user_collection.insertOne(logObject)
}