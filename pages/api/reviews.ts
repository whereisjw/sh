import smtpTransport from "@/prisma/email";
import prisma from "../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

/* 

declare module "iron-session"{
    interface IronSessionData{
        user?:{
            id:number;
        }
    }
}

interface IResponse{
    ok?:boolean;
    [key:string]:any;
}
 */

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user } = req.session;
    const reviews = await prisma;

    if (req.method === "GET") {
      const reviews = await prisma.review.findMany({
        where: {
          createById: user?.id,
        },
      });

      res.json({
        ok: true,
        reviews,
      });
    } //GET
  },
  {
    cookieName: "shSession",
    password: "1354948945415616571651765156741675174657414765156489649949",
  }
);
