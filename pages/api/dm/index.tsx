import smtpTransport from "@/prisma/email";
import prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user } = req.session;
    if (req.method === "POST") {
      const { id }: any = req.body;
      const writer = await prisma.product.findUnique({
        where: {
          id: +id,
        },
        include: {
          user: true,
        },
      });
      const buyer = await prisma.user.findUnique({
        where: {
          id: user?.id,
        },
      });
      if (writer?.user.id === user?.id) {
        return res.json({ ok: false });
      }
      let dmTitle = [];
      dmTitle.push(writer?.user.id);
      dmTitle.push(buyer?.id);
      dmTitle = dmTitle.sort();
      let dmTitleString = dmTitle.join("-");
      console.log(dmTitle);

      /*   if (writer && buyer) {
        await prisma.dMRoom.upsert({
          where: {
            sellerId: writer?.user.id,
            buyerId: buyer?.id,
          },
          create: {
            sellerId: writer?.user.id,
            buyerId: buyer?.id,
          },
          update: {},
        });
      } //writer && buyer */

      res.json({ ok: true, room: dmTitleString });
    } //POST
    /* if (req.method === "GET") {
      //디엠리스트 겟요청
      const me = await prisma.user.findUnique({
        where: {
          id: user?.id,
        },
      });
      const myEmail = me?.email;
      if (myEmail) {
        const myDmList = await prisma.dMList.findMany({
          where: {
            id: {
              contains: myEmail,
            },
          },
        });

        res.json({ ok: true, myDmList });
      } else {
        const myDmList: string[] = [];
        res.json({ ok: true, myDmList });
      }
    } //GET */
  },

  {
    cookieName: "shSession",
    password: "1354948945415616571651765156741675174657414765156489649949",
  }
);
