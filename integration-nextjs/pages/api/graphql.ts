import app, { schema, server } from "nexus";
import { getSortedPosts } from "../../db/posts.mock";

//-- schema

schema.objectType({
  name: "Post",
  rootTyping: "Post",
  definition(t) {
    t.id("id");
    t.string("title");
    t.string("date");
    t.string("content");
  },
});

schema.queryType({
  definition(t) {
    t.field("post", {
      type: "Post",
      args: {
        id: schema.idArg({ required: true }),
      },
      resolve(_, args) {
        return getSortedPosts().then((posts) =>
          posts.find((p) => p.id === args.id)
        );
      },
    });

    t.list.field("posts", {
      type: "Post",
      resolve() {
        return getSortedPosts();
      },
    });
  },
});

//-- boilerplate

app.assemble();

export default server.handlers.graphql;
