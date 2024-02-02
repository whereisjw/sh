import prisma from "../../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id }: any = req.query;
    const { user } = req.session;
    const { answer } = req.body;
    if (req.method === "POST") {
      const createAnswer = await prisma.answer.create({
        data: {
          answer: answer,
          user: {
            connect: {
              id: user?.id,
            },
          },
          post: {
            connect: {
              id: +id,
            },
          },
        },
      });

      res.json({ ok: true, answer: createAnswer });
    } //POST
  },
  {
    cookieName: "shSession",
    password: "1354948945415616571651765156741675174657414765156489649949",
  }
);
