import Axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const innerRes = await Axios.request({
    method: "get",
    url: "http://localhost:4000",
  });

  res.writeHead(innerRes.status, innerRes.headers).end(innerRes.data);
};
