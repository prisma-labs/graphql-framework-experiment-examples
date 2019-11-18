import { objectType, queryType } from "pumpkins";

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.string("name");
  }
});

export const Query = queryType({
  definition(t) {
    t.list.field("users", {
      type: "User",
      resolve(_root, _args, _ctx) {
        return [{ id: "1643", name: "newton" }];
      }
    });
  }
});
