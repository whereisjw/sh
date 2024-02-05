import smtpTransport from "@/prisma/email";
import prisma from "../../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { message } = req.body;
    const { user } = req.session;
    const { id }: any = req.query;
    if (req.method === "POST") {
      const stream = await prisma.message.create({
        data: {
          message,
          stream: {
            connect: {
              id: +id,
            },
          },
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
      res.json({ ok: true, stream });
    } //POST
  },
  {
    cookieName: "shSession",
    password: "1354948945415616571651765156741675174657414765156489649949",
  }
);
