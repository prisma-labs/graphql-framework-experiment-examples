import { schema } from "nexus";
import { NextApiRequest, NextApiResponse } from "next";

schema.queryType({
  definition(t) {
    t.string("hello", () => "world");
  },
});

export default (req: NextApiRequest, res: NextApiResponse) => {};
