import SchemaBuilder from '@pothos/core';
import { Link } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { prisma } from '../lib/prisma';
import { myContext } from '../types/context';
import validationPlugin from '@pothos/plugin-validation';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import z from 'zod';
import { LinkSchema } from '../types/schema';


const builder = new SchemaBuilder<{
    Context: {
        auth: myContext
    },
    AuthScopes: {
        private: boolean
    }
}>({
    plugins: [validationPlugin, ScopeAuthPlugin],
    validationOptions: {
        validationError: (ZodError, _args, _context, _info) => {
            throw new GraphQLError('validate', { extensions: { code: 'validation failed', error: ZodError.format() } })
        }
    },
    authScopes: async (context) => {
        const { auth } = context;
        return { private: !!auth?.user }
    }
});



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

const LinkInput = builder.inputType('LinkInput', ({
    fields: t => ({
        title: t.string({
            required: true,
            validate: { schema: LinkSchema.shape.title }
        }),
        description: t.string({
            required: true,
            validate: { schema: LinkSchema.shape.description }
        }),
        url: t.string({
            required: true,
            validate: { schema: LinkSchema.shape.url }
        }),
        imageUrl: t.string({
            required: true,
            validate: { schema: LinkSchema.shape.imageUrl }
        }),
        category: t.string({
            required: true,
            validate: { schema: LinkSchema.shape.category }
        }),
    })
}))


builder.mutationType({
    fields: t => ({
        createLink: t.field({
            type: LinkObject,
            args: {
                input: t.arg({ type: LinkInput, required: true })
            },
            // authScopes: {
            //     private: true
            // },
            resolve: async (_root, args, ctx) => {
                console.log('reaching here')
                if (!ctx.auth?.user) throw new Error('Not Authorized')
                const link = await prisma.link.create({
                    data: {
                        userId: ctx.auth?.user?.id,
                        ...args.input
                    }
                })

                return link
            }
        })
    })
})

export const schema = builder.toSchema()