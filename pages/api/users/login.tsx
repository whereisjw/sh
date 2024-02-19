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
      await new Promise((resolve, reject) => {
        // send mail
        smtpTransport.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log(info);
            resolve(info);
          }
        });
      });
      smtpTransport.close();
    }

    res.status(200).json({ ok: true });
  } //post
}
