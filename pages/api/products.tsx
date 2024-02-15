import smtpTransport from "@/prisma/email";
import prisma from "../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

interface IResponse {
  ok?: boolean;
  [key: string]: any;
}

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
    const { page } = req.query;
    const { name, price, description, avatarURL } = req.body;
    const { user } = req.session;
    if (req.method === "GET") {
      const products = await prisma.product.findMany({
        take: 4,
        skip: 4 * (Number(page) - 1),
        include: {
          _count: {
            select: {
              Like: true,
            },
          },
        },
      });

      res.json({ products, length: products.length });
    }
    if (req.method === "POST") {
      const products = await prisma.product.create({
        data: {
          name,
          price,
          description,
          image: avatarURL,
          category: "덤벨",
          user: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
      res.json({ ok: true, products });
    } //POST
  },
  {
    cookieName: "shSession",
    password: "1354948945415616571651765156741675174657414765156489649949",
  }
);
