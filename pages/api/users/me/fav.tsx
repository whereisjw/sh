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

interface IResponse {
  ok?: boolean;
  [key: string]: any;
}

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
    const { user } = req.session;
    if (req.method === "GET") {
      const fav = await prisma.like.findMany({
        where: {
          userId: user?.id,
        },
        include: {
          product: true,
        },
      });
      res.json({
        ok: true,
        fav,
      });
    } //GET
  },
  {
    cookieName: "shSession",
    password: "1354948945415616571651765156741675174657414765156489649949",
  }
);
