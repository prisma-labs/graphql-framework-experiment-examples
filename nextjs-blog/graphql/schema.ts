import bodyParser from "body-parser";
import cors from "cors";
import { log, schema, server } from "nexus";
import { getSortedPosts } from "../db/post";

server.express.use(cors());
server.express.use(bodyParser.json());
server.express.use((req, _res, next) => {
  if (req.body.operationName === "IntrospectionQuery") {
    log.trace("request", {
      path: req.path,
      method: req.method,
      body: req.body,
      query: req.query,
    });
  } else {
    log.debug("incoming graphql operation", req.body);
  }
  next();
});

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