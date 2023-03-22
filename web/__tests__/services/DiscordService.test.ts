import createFetchMock from "vitest-fetch-mock"
import { vi } from "vitest";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

import { describe, expect, it } from "vitest"
import { DiscordService } from "../../src/server/api/services/DiscordService"
import prisma from "../../src/server/__mocks__/db"

describe("Discord Service", () => {
  it("getDiscordToken should return Discord access token", async () => {
    // @ts-ignore
    prisma.account.findFirst.mockResolvedValue({
      access_token: "TEST-1"
    });

    const accessToken = await DiscordService.getDiscordToken("TEST-1", prisma);
    expect(accessToken).toBe("TEST-1")
  });

  it("getUserDetails should return User Details object", async () => {
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

    fetchMocker.mockResponseOnce(JSON.stringify(expectedDetails))

    const getUserDetails = await DiscordService.getUserDetails("TEST-1", prisma)
    expect(getUserDetails).toStrictEqual(expectedDetails)
  })

  it("getUserConnections should return User Connections object", async () => {
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
      },
      {
        "type": "github",
        "id": "2920970",
        "name": "Meta502",
        "visibility": 1,
        "friend_sync": false,
        "show_activity": true,
        "verified": true,
        "two_way_link": false,
        "metadata_visibility": 1
      },
      {
        "type": "skype",
        "id": "adrian.ardizza",
        "name": "adrian.ardizza",
        "visibility": 0,
        "friend_sync": true,
        "show_activity": true,
        "verified": false,
        "two_way_link": false,
        "metadata_visibility": 1
      },
      {
        "type": "spotify",
        "id": "21rpsytk44svka2tekmqx4ycy",
        "name": "Adrian Ardizza",
        "visibility": 1,
        "friend_sync": false,
        "show_activity": true,
        "verified": true,
        "two_way_link": false,
        "metadata_visibility": 0
      },
      {
        "type": "steam",
        "id": "76561198272140481",
        "name": "Meta",
        "visibility": 1,
        "friend_sync": false,
        "show_activity": true,
        "verified": true,
        "two_way_link": false,
        "metadata_visibility": 1
      },
      {
        "type": "twitch",
        "id": "90555175",
        "name": "meta781",
        "visibility": 1,
        "friend_sync": false,
        "show_activity": true,
        "verified": true,
        "two_way_link": false,
        "metadata_visibility": 1
      }
    ]

    fetchMocker.mockResponseOnce(JSON.stringify(expectedConnections))

    const getUserDetails = await DiscordService.getUserConnections("TEST-1", prisma)
    expect(getUserDetails).toStrictEqual(expectedConnections)
  })
})
