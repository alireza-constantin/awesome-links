import { Link } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { builder } from "../pages/api/graphql"

const LinkObject = builder.objectRef<Link>('Link')

LinkObject.implement({
    fields: (t) => ({
        id: t.exposeID('id'),
        title: t.exposeString('title'),
        description: t.exposeString('description'),
        url: t.exposeString('url'),
        imageUrl: t.exposeString('imageUrl'),
        category: t.exposeString('category'),
        userId: t.exposeString('userId')
    })
})

builder.queryType({
    fields: t => ({
        hello: t.string({
            resolve: (_parent, _args, ctx) => {
                console.log(ctx)
                return `hello heeeyo`
            }
        }),
        links: t.field({
            type: [LinkObject],
            authScopes: {
                private: true
            },
            resolve: (_parent, _args, ctx) => {
                const { auth } = ctx;
                return prisma.link.findMany({
                    where: {
                        userId: auth?.user?.id
                    }
                })
            }
        })
    })
})
