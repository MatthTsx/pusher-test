import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { pusherServer } from "~/server/pusher";

export const UserRouter = createTRPCRouter({
    ChangeStatus: protectedProcedure
        .input(z.object({id: z.string(), status: z.number()}))
        .mutation(async ({ctx, input}) => {
            const m = await ctx.prisma.user.update({
                data: {
                    OnlineStatus: input.status == 1 ? "AWAY" : "ONLINE",
                },
                where: { id: input.id },
                select: {
                    LastOnline: true, OnlineStatus: true, id:true
                }
            })
            pusherServer.trigger(`User-${input.id}`, "Online-Change", m)
        })
});
