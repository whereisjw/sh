import smtpTransport from "@/prisma/email";
import prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
      const { id }: any = req.query;
      const { user } = req.session;
      const post = await prisma.post.findUnique({
        where: {
          id: +id,
        },
        include: {
          user: true,
          Answer: {
            select: {
              user: true,
              id: true,
              answer: true,
              createdAt: true,
            },
          },
          _count: {
            select: {
              Answer: true,
              Wondering: true,
            },
          },
        },
      });
      const isWondering = Boolean(
        await prisma.wondering.findFirst({
          where: {
            postId: +id,
            userId: user?.id,
          },
        })
      );

      res.json({
        ok: true,
        post,
        isWondering,
      });
    } //GET
  },
  {
    cookieName: "shSession",
    password: "1354948945415616571651765156741675174657414765156489649949",
  }
);
