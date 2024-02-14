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
      dmTitle.push(writer?.user.email);
      dmTitle.push(buyer?.email);
      dmTitle = dmTitle.sort();
      let dmTitleString = dmTitle.join("-");
      console.log(dmTitleString);

      if (writer && buyer) {
        const dmRoom = await prisma.dMRoom.upsert({
          where: {
            private: dmTitleString,
          },
          create: {
            sellerId: writer?.user.id,
            buyerId: buyer?.id,
            private: dmTitleString,
          },
          update: {},
        });
        res.json({ ok: true, room: dmRoom.id });
      } //writer && buyer
    } //POST
    if (req.method === "GET") {
      //디엠리스트 겟요청
      const me = await prisma.user.findUnique({
        where: {
          id: user?.id,
        },
      });
      const myID = me?.email;
      if (myID) {
        const myDmList = await prisma.dMRoom.findMany({
          where: {
            private: {
              contains: myID,
            },
          },
          include: {
            seller: true,
            buyer: true,
            DM: {
              include: {
                user: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        });

        res.json({ ok: true, myDmList, myEmail: myID });
      } else {
        const myDmList: string[] = [];
        res.json({ ok: true, myDmList });
      }
    } //GET
  },

  {
    cookieName: "shSession",
    password: "1354948945415616571651765156741675174657414765156489649949",
  }
);
