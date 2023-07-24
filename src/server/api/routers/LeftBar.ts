import {z} from 'zod'
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { pusherServer } from '~/server/pusher';

export const LeftRouter = createTRPCRouter({
    getUsers: publicProcedure
        .input(z.object({id: z.string()}))
        .query( ({ctx, input}) => {
            return ctx.prisma.conversations.findMany({
                select: {
                    id: true, Users: {
                        // where: {
                        //     NOT: {id: input.id},
                        // },
                        select: {
                            image: true,
                            name: true,
                            OnlineStatus: true,
                            LastOnline: true,
                            id: true
                        }
                    },
                    Messages: {
                        orderBy: {
                            CreatedAt: 'desc',
                        },
                        take: 1,
                        select: {
                            text: true,
                            isImage: true,
                            author: {
                                select: {
                                    name: true
                                }
                            },
                            CreatedAt: true
                        }
                    }
                },
                where: {
                    Users: {
                        some: { id: input.id },
                    }
                },
            })
        })
})