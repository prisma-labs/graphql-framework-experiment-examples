process.env.NEXUS_SHOULD_GENERATE_ARTIFACTS = "true";

import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import app from "nexus";

if (!(app as any).__state.isWasServerStartCalled) {
  require("../../graphql/schema");
  app.server.start();
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const innerRes = await Axios.request({
    method: "post",
    url: "http://localhost:4000/graphql",
    headers: req.headers,
    data: req.body,
  });

  res
    .writeHead(innerRes.status, innerRes.headers)
    .end(JSON.stringify(innerRes.data));
};
