import smtpTransport from "@/prisma/email";
import prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user } = req.session;

    if (req.method === "POST") {
      await req.session.destroy();
      res.setHeader("Set-Cookie", "shSession=; Max-Age=0; path=/; HttpOnly");
      res.json({ ok: true });
    } //POST
  },
  {
    cookieName: "shSession",
    password: "1354948945415616571651765156741675174657414765156489649949",
  }
);
