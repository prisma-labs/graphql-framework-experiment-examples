process.env.NEXUS_SHOULD_GENERATE_ARTIFACTS = "true";

import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import app from "nexus";

if (!(app as any).__state.isWasServerStartCalled) {
  app.server.start();
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const innerRes = await Axios.request({
    method: "get",
    url: "http://localhost:4000",
  });

  res.writeHead(innerRes.status, innerRes.headers).end(innerRes.data);
};
