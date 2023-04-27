import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import jwt from 'jsonwebtoken';
import { env } from "../../../env.mjs";
import argon2 from "argon2";

export class AdminService {
    public static async login(usernameInput: string, passwordInput: string, prisma: PrismaClient) {
        const admin = await prisma.admin.findUnique({ where: { username: usernameInput } });
        if (!admin) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: "User not found"
            })
        }
        // console.log(argon2.hash(passwordInput))
        if (await argon2.verify(admin.password, passwordInput)) {
            // Make sure all our lib methods obfuscate the password
            admin.password = "";
            const secret = env.JWT_SECRET
            console.log(secret)
            return jwt.sign(
                {
                    isLogin: true,
                    username: admin.username
                },
                secret,
                { expiresIn: '1d' }
            )
        }
        else{
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: "Wrong Password"
            })
        }
    }
}