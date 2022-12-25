import { Context } from "./context";

export const resolvers = {
    Query: {
        links: async (_parent: unknown, _args: unknown, ctx: Context) => await ctx.prisma.link.findMany()
    }

}