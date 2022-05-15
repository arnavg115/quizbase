import axios from "axios";
import { NextApiHandler } from "next";
import { grabParams } from "utils";
import { serialize } from "cookie";

const handler: NextApiHandler = async (req, res) => {
  const resp = await axios.get("http://localhost:8000/login", {
    params: {
      code: grabParams(req.url!.split("?")[1]).code,
    },
  });
  res.setHeader(
    "Set-Cookie",
    serialize("jid", resp.data.refreshToken, {
      sameSite: "lax",
      httpOnly: true,
      path: "/",
    })
  );
  return res.send(resp.data.accessToken);
};

export default handler;
