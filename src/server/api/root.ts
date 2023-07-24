import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { LeftRouter } from "./routers/LeftBar";
import { devRounter } from "./routers/devThings";
import { RightRouter } from "./routers/RightBat";
import { UserRouter } from "./routers/User";
import { LookRouter } from "./routers/LookRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  LeftBar: LeftRouter,
  RightBar: RightRouter,
  DevPower: devRounter,
  UserRouter: UserRouter,
  LookRouter: LookRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
