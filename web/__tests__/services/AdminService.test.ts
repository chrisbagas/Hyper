import "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";
import prisma from "../../src/server/__mocks__/db";
import jwt from 'jsonwebtoken';
import { env } from "../../src/env.mjs";
import { AdminService } from "../../src/server/api/services/AdminService";
vi.mock("../../src/server/db")

describe("ADMIN RPC", () => {
    it("login should throw error if username not found", async () => {
        const mockPrisma = prisma
    
        prisma.admin.findUnique.mockResolvedValue(null)

        await expect(AdminService.login(
            "test",
            "test",
            mockPrisma
        )).rejects.toThrowError()
    })

    it("login should throw error if password does not match", async () => {
        const mockPrisma = prisma
        
        const mock = {
          id: "test1",
          username: "test",
          password: "$argon2d$v=19$m=12,t=3,p=1$NDY2NnVvYXdsZjAwMDAwMA$9Uu34rA5YBkEjN26dySJCA"
        }

        prisma.admin.findUnique.mockResolvedValue(mock)
        
        await expect(AdminService.login(
            "test",
            "adadsad",
            mockPrisma
        )).rejects.toThrowError()
    })
})