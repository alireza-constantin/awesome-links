import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse, PageConfig } from 'next';
import { schema } from '../../graphql/schema';
import { getServerAuthSession } from '../../lib/get-serverside-session';


const apolloServer = new ApolloServer({
    schema,
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