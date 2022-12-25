import { makeSchema } from "nexus";
import { join } from "path";
import { Link, LinksQuery } from './types/Link'
import { User } from './types/User'

export const schema = makeSchema({
    types: [Link, User, LinksQuery],
    outputs: {
        typegen: join(
            process.cwd(), "graphql", "nexus-typegen.ts"
        ),
        schema: join(process.cwd(), "graphql", "schema.graphql"),
    },
    contextType: {
        export: "Context",
        module: join(process.cwd(), "graphql", "context.ts"),
    },
})
