import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const devRounter = createTRPCRouter({
    addConversation: protectedProcedure
        .input(z.object({ids: z.array(z.object({id: z.string()}))}))
        .mutation(async ({ctx,input}) => {
            await ctx.prisma.conversations.create({
                data: {
                    Users: {
                        connect: [
                            ...input.ids
                        ]
                    }
                }
            })
        }),
    DeleteAllThings: protectedProcedure
        .mutation(async ({ctx}) => {
            await ctx.prisma.example.deleteMany()
            await ctx.prisma.messages.deleteMany()
            await ctx.prisma.conversations.deleteMany()
            await ctx.prisma.verificationToken.deleteMany()
            await ctx.prisma.session.deleteMany()
            await ctx.prisma.user.deleteMany()
            await ctx.prisma.account.deleteMany()
        })
});
