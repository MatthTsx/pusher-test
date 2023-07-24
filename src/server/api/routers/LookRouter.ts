import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const LookRouter = createTRPCRouter({
  getUsers: protectedProcedure
    .input(z.object({
        userId: z.string(),
    }))
    .query(({ctx, input}) => {
        return ctx.prisma.user.findMany({
            where: {
                NOT: {id: input.userId},
                // Conversas: {
                //     every: { Users: { none:{ id: input.userId } } }
                // }
            },
            select: {
                id: true, name: true, image: true
            }
        })
    }),

  createConversation: protectedProcedure
    .input(z.object({
        usersId: z.array(z.string())
    }))
    .mutation(async ({ctx, input}) => {
        const has = await ctx.prisma.conversations.findFirst({ where: { Users: { 
            every: {id: {in: input.usersId}}
         }}})

        if(has) return {id:"a"}

        return await ctx.prisma.conversations.create({
            data: { Users: {connect: 
                input.usersId.map((u) => ({id: u}))
            } },
            select: {
                id: true
            }
        })
    }),

    findFirstConv: protectedProcedure
    .input(z.object({users: z.array(z.string())}))
    .query(async ({ctx, input}) => {
        return await ctx.prisma.conversations.findFirst({
            where: { Users: {every: {
                id: {in: input.users}
            }} },
            select: {id:true}
        }) 
    })
});
