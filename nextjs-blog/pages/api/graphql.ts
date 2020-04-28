import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

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
