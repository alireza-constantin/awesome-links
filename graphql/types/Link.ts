import { objectType } from "nexus";

export const Link = objectType({
    name: 'Link',
    definition(t) {
        t.string('id');
        t.int('index');
        t.int('userId');
        t.string('title');
        t.string('url');
        t.string('description');
        t.string('imageUrl');
        t.string('category');
    },
})