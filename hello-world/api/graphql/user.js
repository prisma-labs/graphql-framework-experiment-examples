import { schema } from "nexus";
schema.objectType({
    name: "User",
    definition: function (t) {
        t.field("id", { type: "ID" });
        t.field("name", { type: "String" });
    }
});
schema.objectType({
    name: "Query",
    definition: function (t) {
        t.list.field("users", {
            type: "User",
            resolve: function (_root, _args, ctx) {
                ctx.log.debug("resolve", {
                    object: "Query",
                    field: "users",
                    type: "[User]"
                });
                return [];
                // return [ctx.db.users.newton]
            }
        });
    }
});
