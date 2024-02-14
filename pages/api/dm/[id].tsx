import smtpTransport from "@/prisma/email";
import prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user } = req.session;
    const { id }: any = req.query;
    if (req.method === "POST") {
      const { dm, url } = req.body; //url형변환해야함 스트링타입임지금
      await prisma.dM.create({
        data: {
          dm: dm,
          user: {
            connect: {
              id: user?.id,
            },
          },
          dmroom: {
            connect: {
              id: +url,
            },
          },
        },
      });

      res.json({ ok: true });
    } //POST
    if (req.method === "GET") {
      const dms = await prisma.dM.findMany({
        where: {
          dmroomId: +id,
        },
        include: {
          user: true,
        },
      });

      res.json({ ok: true, dms });
    } //GET
  },

  {
    cookieName: "shSession",
    password: "1354948945415616571651765156741675174657414765156489649949",
  }
);
