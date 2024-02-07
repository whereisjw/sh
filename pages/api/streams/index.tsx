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

/* interface IResponse {
  ok?: boolean;
  [key: string]: any;
} */

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, price, description } = req.body;
    const { user } = req.session;
    if (req.method === "GET") {
      const stream = await prisma.stream.findMany({});
      res.json({
        ok: true,
        stream,
      });
    } //GET
    if (req.method === "POST") {
      const stream = await prisma.stream.create({
        data: {
          name,
          price: +price,
          description,
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
      res.json({
        ok: true,
        stream,
      });
    } //POST
  },
  {
    cookieName: "shSession",
    password: "1354948945415616571651765156741675174657414765156489649949",
  }
);