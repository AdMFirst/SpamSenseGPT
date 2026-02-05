import DataNotFoundError from "../exceptions/data-not-found-error";
import User from "./models/user";
import { NextRequest, userAgent } from "next/server";
import RequestMetadata, { ThumbmarkMetadata } from "./models/request-metadata";
import { Pool } from "pg";

// Create a connection pool with proper configuration
const getPoolConfig = () => {
    const config: any = {
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000, // 10 seconds - more lenient for remote DBs
    };
    
    const connectionString = process.env.DATABASE_URL;
    
    if (connectionString) {
        config.connectionString = connectionString;
    } else {
        // Fallback to individual connection parameters
        config.host = process.env.DB_HOST || 'localhost';
        config.port = parseInt(process.env.DB_PORT || '5432');
        config.database = process.env.DB_NAME;
        config.user = process.env.DB_USER;
        config.password = process.env.DB_PASSWORD;
    }
    
    // Add SSL configuration for production databases
    if (process.env.NODE_ENV === 'production' && !config.connectionString?.includes('localhost')) {
        config.ssl = {
            rejectUnauthorized: false // For self-signed certificates; set to true for valid certs
        };
    }
    
    return config;
};

const pool = new Pool(getPoolConfig());

export async function getUserData(uuid: string): Promise<User> {
    if (!uuid || uuid.trim().length === 0) {
        throw new Error("Invalid user ID");
    }

    const query = 'SELECT * FROM "user" WHERE uuid = $1';
    const values = [uuid];

    try {
        const client = await pool.connect();
        try {
            const res = await client.query(query, values);
            
            if (res.rows.length > 0) {
                return res.rows[0] as User;
            } else {
                throw new DataNotFoundError("User not found");
            }
        } finally {
            client.release();
        }
    } catch (error) {
        if (error instanceof DataNotFoundError) {
            throw error;
        }
        
        // Enhanced error logging for connection issues
        const err = error as Error;
        const errorMessage = err.message || 'Unknown error';
        
        // Log detailed connection info in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Database connection error details:', {
                message: errorMessage,
                stack: err.stack,
                databaseUrl: process.env.DATABASE_URL ? '***' : 'Not set',
                poolConfig: {
                    max: 10,
                    idleTimeoutMillis: 30000,
                    connectionTimeoutMillis: 10000
                }
            });
        }
        
        throw new Error(`Database error: ${errorMessage}`);
    }
}

export async function addUserData(uuid: string, request: NextRequest, thumbmarkMetadata?: ThumbmarkMetadata): Promise<User> {
    if (!uuid || uuid.trim().length === 0) {
        throw new Error("Invalid user ID");
    }

    const time = (new Date()).toISOString();

    const logData: RequestMetadata = {
        time: time,
        url: request.nextUrl.toString(),
        ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            request.headers.get('x-real-ip') ||
            null,
        ua: userAgent(request),
        geo: undefined,
        thumbmark: thumbmarkMetadata
    };

    const newUser: User = {
        uuid: uuid,
        token: 5,
        metadata: logData
    };

    const insertQuery = `
        INSERT INTO "user" (uuid, token, metadata)
        VALUES ($1, $2, $3::jsonb)
        ON CONFLICT (uuid) DO NOTHING
        RETURNING *;
    `;

    const values = [newUser.uuid, newUser.token, JSON.stringify(newUser.metadata)];

    try {
        const client = await pool.connect();
        try {
            const res = await client.query(insertQuery, values);
            
            if (res.rows.length > 0) {
                return res.rows[0] as User;
            } else {
                // User already exists, fetch existing user
                return await getUserData(uuid);
            }
        } finally {
            client.release();
        }
    } catch (error) {
        const err = error as Error;
        const errorMessage = err.message || 'Unknown error';
        
        if (process.env.NODE_ENV === 'development') {
            console.error('Database insert error details:', {
                message: errorMessage,
                stack: err.stack,
                uuid: uuid
            });
        }
        
        throw new Error(`Database error: ${errorMessage}`);
    }
}

export async function reduceToken(user: User): Promise<User> {
    if (user.token < 1) {
        throw new Error("Token limit reached");
    }

    const updateQuery = 'UPDATE "user" SET token = token - 1 WHERE uuid = $1 RETURNING *';
    const values = [user.uuid];

    try {
        const client = await pool.connect();
        try {
            const res = await client.query(updateQuery, values);
            
            if (res.rows.length > 0) {
                return res.rows[0] as User;
            } else {
                throw new DataNotFoundError("User not found during token reduction");
            }
        } finally {
            client.release();
        }
    } catch (error) {
        if (error instanceof DataNotFoundError) {
            throw error;
        }
        
        const err = error as Error;
        const errorMessage = err.message || 'Unknown error';
        
        if (process.env.NODE_ENV === 'development') {
            console.error('Database update error details:', {
                message: errorMessage,
                stack: err.stack,
                userUuid: user.uuid,
                currentToken: user.token
            });
        }
        
        throw new Error(`Database error: ${errorMessage}`);
    }
}
