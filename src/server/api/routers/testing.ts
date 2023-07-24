// import {z} from 'zod'
// import {
//     createTRPCRouter,
//     publicProcedure,
//     protectedProcedure,
// } from "~/server/api/trpc";
// import { pusherServer } from '~/server/pusher';

// export const testRouter = createTRPCRouter({
//     addMessage: publicProcedure
//         .input(z.object({text : z.string(), id: z.string()}))
//         .mutation(async ({input, ctx}) => {
//             const m = await ctx.prisma.messages.create({
//                 data: {
//                     text: input.text,
//                     author: {
//                         connect:{
//                             id: input.id,
//                         }
//                     }
//                 },
//                 select: {
//                     text: true,
//                     id: true,
//                     author: {
//                         select: {
//                             name: true
//                         }
//                     }
//                 }
//             })
//             await pusherServer.trigger("A", "message:new", m)
//         }),
//     getMessages: publicProcedure
//         .query(({ctx}) => {
//             return ctx.prisma.messages.findMany({
//                 select:{
//                     text: true,
//                     id: true,
//                     author: {
//                         select: {
//                             name: true
//                         }
//                     }
//                 }
//             });
//         }),
//     DeleteALL: protectedProcedure
//         .mutation(async ({ctx}) => {
//             await ctx.prisma.messages.deleteMany()
//         })
// })