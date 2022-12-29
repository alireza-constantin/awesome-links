import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import SchemaBuilder from '@pothos/core';
import validationPlugin from '@pothos/plugin-validation';
import { GraphQLError } from 'graphql'
import { Session } from 'next-auth';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import { getServerAuthSession } from '../../lib/get-serverside-session';

type myContext = {
    auth: Session | null
}


const builder = new SchemaBuilder<{
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
        console.log('from auth scope:', context)
        return { private: !!context.auth?.user }
    }
});

builder.queryType({
    fields: t => ({
        hello: t.string({
            // args: {
            //     name: t.arg.string({
            //         required: true,
            //         validate: {
            //             schema: helloNameSchema
            //         }
            //     }),
            // },
            authScopes: {
                private: true
            },
            resolve: (_parent, args, ctx) => {
                console.log(ctx)
                return `hello heeeyo`
            }
        })
    })
})


const apolloServer = new ApolloServer({
    schema: builder.toSchema(),
    context: async ({ req, res }) => ({
        auth: await getServerAuthSession({ req, res })
    })
});

const startServer = apolloServer.start();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
        'Access-Control-Allow-Origin',
        'https://studio.apollographql.com'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    if (req.method === 'OPTIONS') {
        res.end();
        return false;
    }
    await startServer;

    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res);
};

// Apollo Server Micro takes care of body parsing
export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};