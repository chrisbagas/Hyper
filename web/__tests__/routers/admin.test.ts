import "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";
import prisma from "../../src/server/__mocks__/db";
import jwt from 'jsonwebtoken';
import { env } from "../../src/env.mjs";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";

vi.mock("../../src/server/db")
describe("ADMIN RPC", () => {
    it("login should return a token if login is successful", async () => {
        const input = {
          usernameInput: "test",
          passwordInput: "test",
        }
        
        const mockPrisma = {
          id: "test1",
          username: "test",
          password: "$argon2d$v=19$m=12,t=3,p=1$NDY2NnVvYXdsZjAwMDAwMA$9Uu34rA5YBkEjN26dySJCA"
        }
        env.JWT_SECRET = 'test'
        const ctx = {
          session: {
            user: {
              id: "1"
            }
          },
          prisma,
        }
    
        prisma.admin.findUnique.mockResolvedValue(mockPrisma)
    
        const caller = appRouter.createCaller(ctx)
        const value = await caller.admin.login(input)
        
        expect(jwt.verify(value,env.JWT_SECRET).username).toBe(input.usernameInput)
      })
    it("login should throw error if username not found", async () => {
        const input = {
          usernameInput: "test",
          passwordInput: "test",
        }
    
        const ctx = {
          session: {
            user: {
              id: "1"
            }
          },
          prisma,
        }
    
        prisma.admin.findUnique.mockResolvedValue(null)
    
        const caller = appRouter.createCaller(ctx)
        
        expect(caller.admin.login(input)).rejects.toThrowError()
    })
    it("login should throw error if password does not match", async () => {
        const input = {
          usernameInput: "test",
          passwordInput: "dasdasd",
        }

        const mockPrisma = {
            id: "test1",
            username: "test",
            password: "$argon2d$v=19$m=12,t=3,p=1$NDY2NnVvYXdsZjAwMDAwMA$9Uu34rA5YBkEjN26dySJCA"
        }
        const ctx = {
          session: {
            user: {
              id: "1"
            }
          },
          prisma,
        }
    
        prisma.admin.findUnique.mockResolvedValue(mockPrisma)
    
        const caller = appRouter.createCaller(ctx)
        
        expect(caller.admin.login(input)).rejects.toThrowError()
    })
})