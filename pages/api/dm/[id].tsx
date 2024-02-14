import smtpTransport from "@/prisma/email";
import prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user } = req.session;
    const { id } = req.query;
    if (req.method === "POST") {
      const { dm, url } = req.body; //url형변환해야함 스트링타입임지금
      console.log(id, req.body);

      await prisma.dM.create({
        data: {
          dm: dm,
          dmroom: {
            connect: {
              id: +url,
            },
          },
        },
      });

      res.json({ ok: true });
    } //GET
  },

  {
    cookieName: "shSession",
    password: "1354948945415616571651765156741675174657414765156489649949",
  }
);
