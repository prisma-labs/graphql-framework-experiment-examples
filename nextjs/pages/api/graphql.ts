process.env.NEXUS_SHOULD_GENERATE_ARTIFACTS = "false";

import { NextApiRequest, NextApiResponse } from "next";
import Axios from "axios";

const app = require("nexus").default;
const { server } = require("nexus");

const axios = Axios.create({
  baseURL: "http://localhost:4000",
});

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  require("../../graphql/query");
  await server.start();

  const graphqlRes = await axios.post(
    "/graphql",
    {
      query: `{ hello }`,
      variables: {},
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  await server.stop();
  app.resetSingleton();
  require.cache = {};
  return res.json(graphqlRes.data);
};
