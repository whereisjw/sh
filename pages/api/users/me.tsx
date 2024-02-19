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

interface IResponse {
  ok?: boolean;
  [key: string]: any;
}

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
    const { user } = req.session;
    const { email, name, avatarURL } = req.body;

    if (req.method === "GET") {
      if (user) {
        const profile = await prisma.user.findUnique({
          where: { id: req.session.user?.id },
        });

        if (!profile) {
          res.json({ ok: false });
        } //!profile
        if (profile) res.status(200).json({ profile, ok: true });
      } //if user
      if (!user) {
        res.json({ ok: false });
      }
    } //GET
    if (req.method === "POST") {
      console.log(email, name, avatarURL);

      /*     const UserExist = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (UserExist) {
        return res.json({
          ok: false,
        });
      } */
      if (avatarURL) {
        await prisma.user.update({
          where: {
            id: user?.id,
          },
          data: {
            email,
            name,
            avatar: avatarURL,
          },
        });
      }

      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
          name,
        },
      });

      res.json({
        ok: true,
      });
    } //post
  },
  {
    cookieName: "shSession",
    password: "1354948945415616571651765156741675174657414765156489649949",
  }
);
