import { schema } from "nexus";

console.log("==> query.ts module is loading");

schema.queryType({
  definition(t) {
    t.string("hello", () => "world");
  },
});
