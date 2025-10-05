import {Pool} from "pg";
import {betterAuth} from "better-auth";
//import {nextCookies} from "better-auth/next-js";

// const pool = new Pool({
//     host: process.env.DB_HOST || "localhost",
//     port: parseInt(process.env.DB_PORT || "5434" ),
//     database: process.env.DB_NAME || "sidequest",
//     user: process.env.DB_USER || "jihee01",
//     password: process.env.DB_PASSWORD || "0000"
// })

export const auth = betterAuth({
    database: new Pool({
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5434" ),
        database: process.env.DB_NAME || "sidequest",
        user: process.env.DB_USER || "jihee01",
        password: process.env.DB_PASSWORD || "0000",
    }),
    database:
        provider: "postgres",
        pool,
        // 스키마 자동 생성
        schema: {
            user: {
                fields: {
                    nickname: {
                        type: "string",
                        required: true,
                        unique: true,
                    },
                    role: {
                        type: "string",
                        required: false,
                        defaultValue: "USER",
                    },
                },
            },
        },


    emailAndPassword: {
        enabled: true,
        //나중에 true로 변경
        //requireEmailVerification: false,
    },

    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },

    session:{
        cookieCache: {
            enabled: true,
            maxAge: 5*60, //5min
        }
    },

    user:{
        additionalFields:{
            nickname: {
                type: "string",
                required: true,
                unique: true,
            }
        }
    },
})