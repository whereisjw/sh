import smtpTransport from "@/prisma/email";
import prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface IResponse {
  ok: boolean;
  [key: string]: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  const { email } = req.body;
  let 암호 = Date.now() + "";
  if (req.method === "POST") {
    const user = await prisma.user.upsert({
      where: {
        email: email,
      }, //찾아라
      create: {
        email: email,
        name: "기본이름",
      }, //없으면 만들어라
      update: {}, // 있으면 업데이트해라
    });
    const token = await prisma.token.create({
      data: {
        payload: 암호,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    if (email) {
      const mailOptions = {
        from: process.env.MAIL_ID,
        to: email,
        subject: "하마마켓 1회용 인증메일입니다.",
        text: `Authentication Code : ${암호}`,
      };
      const result = await smtpTransport.sendMail(
        mailOptions,
        (error, responses) => {
          if (error) {
            console.log(error);
            return null;
          } else {
            console.log(responses);
            return null;
          }
        }
      );
      smtpTransport.close();
      console.log(result);
    }

    res.status(200).json({ ok: true });
  } //post
}
