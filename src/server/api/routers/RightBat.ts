import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { pusherServer } from "~/server/pusher";

export const RightRouter = createTRPCRouter({
    getMessages: protectedProcedure
        .input(z.object({id: z.string()}))
        .query(({ctx, input}) => {
            return ctx.prisma.conversations.findUnique({
                where: { id: input.id },
                select: {
                    Messages: {
                        orderBy: { CreatedAt: 'desc' },
                        select: {
                            author: {
                                select: {name: true, image: true, id: true}
                            }, text: true, isImage: true
                        }
                    },
                    id: true
                }
            })
        }),
    UploadMessage: protectedProcedure
        .input(z.object({id: z.string(), text: z.string(), userId: z.string(), isImage: z.boolean()}))
        .mutation(async ({ctx, input}) => {
            const users = await ctx.prisma.conversations.findUnique({
                where: {id: input.id},
                select: {
                    UsersId: true
                }
            })

            if(!users?.UsersId.includes(input.userId)) return

            const m = await ctx.prisma.conversations.update({
                where: { id: input.id },
                data: {
                    Messages:{
                        create: {
                            text: input.text, isImage: input.isImage,
                            author: { connect: {
                                id: input.userId
                            } }
                        }
                    }
                },
                select: {
                    Messages: {
                        orderBy: { CreatedAt: 'desc' },
                        take: 1,
                        select: {
                            author: {
                                select: {name: true, image: true, id: true}
                            },
                            text: true, isImage: true
                        }
                    },
                    id: true
                }
            })
            await pusherServer.trigger(`Conversation-${m.id}`, "Messages:new", m)
        })
})
