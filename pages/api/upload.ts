import smtpTransport from "@/prisma/email";
import prisma from "../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user } = req.session;

    if (req.method === "GET") {
      const response = await (
        await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
          {
            method: "POST",
            headers: {
              /*        "Content-Type": "application/json", */
              Authorization: `Bearer ${process.env.CF_TOKEN}`,
            },
          }
        )
      ).json();

      res.json({
        ok: true,
        ...response.result,
      });
    } //GET
  },
  {
    cookieName: "shSession",
    password: "1354948945415616571651765156741675174657414765156489649949",
  }
);
