import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod"
import { TRPCError } from "@trpc/server";
import { CommunityPostStatus, CommunityPostType, ContentType } from "@prisma/client";
import { GuideService } from "../services/GuideService";

export const guideRouter = createTRPCRouter({
  getPostById: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.prisma.communityPost.findUnique({
        where: {
          id: input.id,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          header: {
            select: {
              postId: true,
              type: true,
              url: true,
            }
          }
        }
      })
      if (!data) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: "Post not found"
        })
      }
      return {
        id: data.id,
        type: data.type,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        title: data.title,
        content: data.content,
        authorName: data.author.name,
        header: data.header
      }
    }),
  create: publicProcedure
    .input(
      z.object({
        type: z.nativeEnum(CommunityPostType),
        status: z.nativeEnum(CommunityPostStatus),
        title: z.string(),
        content: z.string(),
        headerType: z.nativeEnum(ContentType),
        headerUrl: z.string(),
        gameId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const post = await ctx.prisma.communityPost.create({
          data: {
            type: input.type,
            status: input.status,
            title: input.title,
            content: input.content,
            author: {
              connect: { id: ctx.session?.user.id },
            },
            game: {
              connect: { id: input.gameId },
            },
            header: {
              create: {
                type: input.headerType,
                url: input.headerUrl,
              },
            },
          }
        })
        return {
          message: "Post created successfully",
          id: post.id,
        }
      } catch (e) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create new post, try again later.'
        })
      }

    }),
  updatePostById: publicProcedure
    .input(
      z.object({
        id: z.string(),
        type: z.nativeEnum(CommunityPostType),
        status: z.nativeEnum(CommunityPostStatus),
        title: z.string(),
        content: z.string(),
        headerType: z.nativeEnum(ContentType),
        headerUrl: z.string(),
        gameId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.communityPost.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          status: true,
        },
      })
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: "Post not found"
        })
      }
      if (post.status === CommunityPostStatus.PUBLISHED) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: "You are not allowed to update a published post"
        })
      }
      try {
        await ctx.prisma.communityPost.update({
          where: {
            id: input.id,
          },
          data: {
            type: input.type,
            status: input.status,
            title: input.title,
            content: input.content,
            header: {
              update: {
                type: input.headerType,
                url: input.headerUrl,
              },
            },
          },
        })
      } catch (e) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to update a post, try again later.'
        })
      }
      return {
        message: "Post updated successfully"
      }
    }),
  getAllbyGame: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      return GuideService.getAllbyGame(input.id, ctx.prisma)
    }),
  getAllbyUser: publicProcedure
    .input(z.object({
      gameId: z.string(),
      userId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      return GuideService.getAllbyUser(input.gameId, input.userId, ctx.prisma)
    }),
})
