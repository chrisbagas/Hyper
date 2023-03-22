import { randomUUID } from "crypto";
import { describe, expect, it, vi } from "vitest"
import { appRouter } from "../../src/server/api/root";
import prisma from "../../src/server/__mocks__/db";

vi.mock("../../src/server/api/services/DiscordService", () => {
  const expectedConnections = [
    {
      "type": "facebook",
      "id": "10214901829761146",
      "name": "Adrian Ardizza",
      "visibility": 0,
      "friend_sync": true,
      "show_activity": true,
      "verified": true,
      "two_way_link": false,
      "metadata_visibility": 1
    }
  ]

  const expectedDetails = {
    "id": "150579219057868802",
    "username": "Meta",
    "display_name": null,
    "avatar": "298b99f01f5f967db673b9801308c5ec",
    "avatar_decoration": null,
    "discriminator": "0147",
    "public_flags": 64,
    "flags": 64,
    "banner": null,
    "banner_color": null,
    "accent_color": null,
    "locale": "en-GB",
    "mfa_enabled": true,
    "premium_type": 0,
    "email": "tmgfaction@gmail.com",
    "verified": true
  }

  return {
    DiscordService: {
      getUserDetails: vi.fn().mockResolvedValue(expectedDetails),
      getUserConnections: vi.fn().mockResolvedValue(expectedConnections),
    }
  }
})

describe("Discord RPC", () => {
  it("getUserDetails should return User details object", async () => {
    const expectedDetails = {
      "id": "150579219057868802",
      "username": "Meta",
      "display_name": null,
      "avatar": "298b99f01f5f967db673b9801308c5ec",
      "avatar_decoration": null,
      "discriminator": "0147",
      "public_flags": 64,
      "flags": 64,
      "banner": null,
      "banner_color": null,
      "accent_color": null,
      "locale": "en-GB",
      "mfa_enabled": true,
      "premium_type": 0,
      "email": "tmgfaction@gmail.com",
      "verified": true
    }

    const randomId = randomUUID()
    const ctx = {
      session: {
        user: {
          id: randomId
        }
      },
      prisma,
    }

    const caller = appRouter.createCaller(ctx)
    const details = await caller.discord.getUserDetails()
    expect(details).toStrictEqual(expectedDetails)
  });

  it("getUserConnections should return user connections", async () => {
    const expectedConnections = [
      {
        "type": "facebook",
        "id": "10214901829761146",
        "name": "Adrian Ardizza",
        "visibility": 0,
        "friend_sync": true,
        "show_activity": true,
        "verified": true,
        "two_way_link": false,
        "metadata_visibility": 1
      }
    ]

    const randomId = randomUUID()
    const ctx = {
      session: {
        user: {
          id: randomId
        }
      },
      prisma,
    }

    const caller = appRouter.createCaller(ctx)
    const connections = await caller.discord.getUserConnections()
    expect(connections).toStrictEqual(expectedConnections)
  })
})
