import DataNotFoundError from "../exceptions/data-not-found-error";
import User from "./models/user";
import { NextRequest, userAgent } from "next/server";
import RequestMetadata from "./models/request-metadata";
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

export async function getUserData(uuid: string) {
    const query = 'SELECT * FROM "user" WHERE uuid = $1';
    const values = [uuid];

    try {
        const client = await pool.connect();
        const res = await client.query(query, values);
        client.release();

        if (res.rows.length > 0) {
            return res.rows[0];
        } else {
            throw new DataNotFoundError("no user found");
        }
    } catch (err: any) {
        throw new Error(`Database error: ${err.message}`);
    }
}

export async function addUserData(uuid: string, request: NextRequest) {
    const time = (new Date()).toLocaleString();

    const logData: RequestMetadata = {
        time: time,
        url: request.nextUrl.toString(),
        ip: request.ip,
        ua: userAgent(request),
        geo: request.geo
    };

    const newUser: User = {
        uuid: uuid,
        token: 5,
        metadata: logData
    };

    //console.log("new user from api route is "+newUser.uuid)
    const insertQuery = `
        INSERT INTO "user" (uuid, token, metadata) 
        VALUES ($1, $2, $3::jsonb)
        ON CONFLICT (uuid) DO NOTHING
        RETURNING *;
    `;

    const values = [newUser.uuid, newUser.token, JSON.stringify(newUser.metadata)];

    try {
        const client = await pool.connect();
        const res = await client.query(insertQuery, values);
        client.release();

        return res.rows[0];
    } catch (err:any) {
        throw new Error(`Database error: ${err.message}`);
    }
}

export async function reduceToken(user: User) {
    if (user.token < 1) {
        throw new Error("token limit reached");
    }

    const updateQuery = 'UPDATE "user" SET token = token - 1 WHERE uuid = $1 RETURNING *';
    const values = [user.uuid];

    try {
        const client = await pool.connect();
        const res = await client.query(updateQuery, values);
        client.release();

        return res.rows[0];
    } catch (err:any) {
        throw new Error(`Database error: ${err.message}`);
    }
}
