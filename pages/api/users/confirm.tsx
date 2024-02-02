import smtpTransport from "@/prisma/email";
import prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

interface IResponse {
  ok: boolean;
  [key: string]: any;
}

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
    const { token } = req.body;
    console.log(req.session);

    if (req.method === "POST") {
      const tokenValid = await prisma.token.findUnique({
        where: {
          payload: token,
        },
      });
      if (!tokenValid) return res.status(404).end();
      req.session.user = {
        id: tokenValid?.userId,
      };
      await req.session.save();
      await prisma.token.deleteMany({
        where: {
          userId: tokenValid.userId,
        },
      });
      res.status(200).json({ ok: true });
    } //post
  },
  {
    cookieName: "shSession",
    password: "1354948945415616571651765156741675174657414765156489649949",
  }
);
