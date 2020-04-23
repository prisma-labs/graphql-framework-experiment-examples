import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log("TITITITITI");
  res.json({ hello: "world" });
};
