import { NextApiHandler } from "next";

const handler: NextApiHandler = (req, res) => {
  return res.send("Hello");
};

export default handler;
